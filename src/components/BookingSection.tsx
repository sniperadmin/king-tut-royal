import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Users, MessageCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface WeeklyBooking {
  id: number;
  week_start_date: string;
  booking_count: number;
}

export default function BookingSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    selectedWeek: '',
    participants: '1',
    selectedPackage: 'vip' // Default to Royal VIP package
  });
  const [availableWeeks, setAvailableWeeks] = useState<WeeklyBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchAvailableWeeks();
    
    // Subscribe to realtime changes
    const channel = supabase
      .channel('weekly_bookings_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'weekly_bookings' },
        () => {
          fetchAvailableWeeks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchAvailableWeeks = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('get-weekly-bookings');
      if (error) throw error;
      
      // Filter weeks that have available slots (less than 50 bookings)
      const available = data.data.filter((week: WeeklyBooking) => week.booking_count < 50);
      setAvailableWeeks(available);
    } catch (error) {
      console.error('Error fetching available weeks:', error);
    } finally {
      setLoading(false);
    }
  };

  const getThursdayDate = (weekStartDate: string) => {
    // The weekStartDate should already be the Thursday date selected by user
    const selectedDate = new Date(weekStartDate);
    return selectedDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getAvailableSlots = (weekData: WeeklyBooking) => {
    return 50 - weekData.booking_count;
  };

  const generateBookingNumber = (bookingCount: number) => {
    return 'KT' + bookingCount.toString().padStart(4, '0');
  };
  const calculateTotalPrice = (packageType: string, guests: number) => {
    const pricePerPerson = packageType === 'vip' ? 2900 : 900;
    return pricePerPerson * guests;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.selectedWeek) return;

    setSubmitting(true);
    
    try {
      // Book the slot
      const { data, error } = await supabase.functions.invoke('book-weekly-slot', {
        body: { weekStartDate: formData.selectedWeek }
      });

      if (error) throw error;
      if (!data.success) throw new Error(data.message);

      const bookingNumber = generateBookingNumber(data.newCount);
      const selectedWeekData = availableWeeks.find(w => w.week_start_date === formData.selectedWeek);
      const thursdayDate = getThursdayDate(formData.selectedWeek);
      const remainingSlots = getAvailableSlots(selectedWeekData!) - parseInt(formData.participants);
      const totalPrice = calculateTotalPrice(formData.selectedPackage, parseInt(formData.participants));

      const packageName = formData.selectedPackage === 'vip' ? 'King Tut Royal VIP (5 Days / 4 Nights)' : 'King Tut VIP One Day';
      
      const message = `
🎭 *King Tut Booking Request*

📋 *Booking Details:*
• Name: ${formData.name}
• Phone: ${formData.phone}
• Package: ${packageName}
• Participants: ${formData.participants}
• Booking Date: ${thursdayDate}
• Total Price: €${totalPrice.toLocaleString()}
• Booking Count: ${data.newCount}
• Remaining Slots: ${remainingSlots}
`;

      const whatsappUrl = `https://wa.me/+971585923054?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      // Refresh available weeks
      await fetchAvailableWeeks();
      
      // Reset form
      setFormData({ name: '', phone: '', selectedWeek: '', participants: '1', selectedPackage: 'vip' });
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-20 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Book Your Royal Experience</h2>
          <p className="text-xl text-amber-400 max-w-2xl mx-auto">
            Limited to 50 bookings per week - Secure your spot now!
          </p>
        </div>

        <Card className="bg-gray-900 border border-amber-400 shadow-xl">
          <CardHeader className="text-center border-b border-amber-400/20">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl text-white">
              <Calendar className="h-6 w-6 text-amber-400" />
              Select Your Package
            </CardTitle>
            <CardDescription className="text-gray-300">Choose your preferred package and date</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            {/* Package Selection */}
            <div className="space-y-4 mb-8">
              <Label className="text-white text-lg">Select Package *</Label>
              <div className="grid md:grid-cols-2 gap-4">
                <div 
                  className={`cursor-pointer rounded-lg p-4 border-2 transition-all ${
                    formData.selectedPackage === 'vip' 
                      ? 'bg-amber-400/20 border-amber-400' 
                      : 'bg-gray-800 border-gray-600 hover:border-amber-400/50'
                  }`}
                  onClick={() => setFormData(prev => ({...prev, selectedPackage: 'vip'}))}
                >
                  <h3 className="text-lg font-semibold text-amber-400 mb-2">King Tut Royal VIP</h3>
                  <p className="text-white text-2xl font-bold">€2,900</p>
                  <p className="text-gray-300 text-sm">5 Days / 4 Nights</p>
                  <p className="text-gray-300 text-sm">per person</p>
                </div>
                <div 
                  className={`cursor-pointer rounded-lg p-4 border-2 transition-all ${
                    formData.selectedPackage === 'oneday' 
                      ? 'bg-amber-400/20 border-amber-400' 
                      : 'bg-gray-800 border-gray-600 hover:border-amber-400/50'
                  }`}
                  onClick={() => setFormData(prev => ({...prev, selectedPackage: 'oneday'}))}
                >
                  <h3 className="text-lg font-semibold text-white mb-2">King Tut VIP One Day</h3>
                  <p className="text-white text-2xl font-bold">€900</p>
                  <p className="text-gray-300 text-sm">Full Day Experience</p>
                  <p className="text-gray-300 text-sm">per person</p>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                    required
                    className="h-12 bg-gray-800 border-gray-600 text-white focus:border-amber-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    className="h-12 bg-gray-800 border-gray-600 text-white focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                    className="h-12 bg-gray-800 border-gray-600 text-white focus:border-amber-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="participants" className="text-white">Number of Guests</Label>
                  <Select
                    value={formData.participants}
                    onValueChange={(value) => setFormData(prev => ({...prev, participants: value}))}
                  >
                    <SelectTrigger className="h-12 bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="Select guests" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="1" className="text-white hover:bg-gray-700">1 Guest</SelectItem>
                      <SelectItem value="2" className="text-white hover:bg-gray-700">2 Guests</SelectItem>
                      <SelectItem value="3" className="text-white hover:bg-gray-700">3 Guests</SelectItem>
                      <SelectItem value="4" className="text-white hover:bg-gray-700">4 Guests</SelectItem>
                      <SelectItem value="5" className="text-white hover:bg-gray-700">5 Guests</SelectItem>
                      <SelectItem value="6" className="text-white hover:bg-gray-700">6 Guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="week" className="text-white">Select Date *</Label>
                <Select
                  value={formData.selectedWeek}
                  onValueChange={(value) => setFormData(prev => ({...prev, selectedWeek: value}))}
                  required
                >
                  <SelectTrigger className="h-12 bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder={loading ? "Loading dates..." : "Choose your Thursday"} />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {availableWeeks.map((week) => (
                      <SelectItem key={week.id} value={week.week_start_date} className="text-white hover:bg-gray-700">
                        <div className="flex items-center justify-between w-full">
                          <span>{getThursdayDate(week.week_start_date)}</span>
                          <span className="ml-4 text-sm text-green-400">
                            {getAvailableSlots(week)} slots available
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="requests" className="text-white">Special requests</Label>
                <textarea
                  id="requests"
                  rows={4}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:border-amber-400 focus:outline-none"
                  placeholder="Any special requests or requirements..."
                />
              </div>

              <Button
                type="submit"
                disabled={!formData.name || !formData.selectedWeek || submitting}
                className="w-full h-14 text-lg bg-gradient-to-r from-amber-400 to-amber-600 text-black hover:from-amber-500 hover:to-amber-700 font-semibold"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                {submitting ? 'Processing...' : 'Secure Your Booking'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}