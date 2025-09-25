from PIL import Image

img = Image.open("young.png")
width, height = img.size
cols, rows = 4, 2
w, h = width // cols, height // rows

for i in range(rows):
    for j in range(cols):
        left, top = j * w, i * h
        right, bottom = (j+1) * w, (i+1) * h
        cropped = img.crop((left, top, right, bottom))
        cropped.save(f"portrait_{i*cols + j + 24}.jpg")
