## Solving a major problem : OpenCV takes a heck lot of time for marking videos with detected objects !

# The Approach:
i)create a react frontend for accepting video and a python backend (I have used Flask ) where OpenCV(which required python) will run.
ii)break the video into frames and each frame would be an image whose base64 format would be pushed into an array 
iii)now we would be iterating over the array and every image data would be sent to the backend where OpenCV would JUST 
return the array of pair of coordinates for the boxes for that image
iv)for each image , we would receive the coordinates back and on html canvas we would produce the image with the boxes (using the
coordinates)
v)now since we are continuing to iterate over the array the image would keep on changing and hence on the canvas a video like effect would 
be produced

# Testing 
First we would send a single image which we would take from the user , receive the coordinates and display the image with bounding boxes 
on html canvas .

# How did it go:
https://github.com/career-tokens/OpenCVMeetsHTMLCanvas/assets/134730030/382f4cdd-af4f-4790-9447-35afaf289b8b

# Now lets use a video this time
We are taking a video from the user and breaking it into 30 frames for now . This step takes the longest time and is the Rate-determining
step of the project . After we get the frames array , we simply do as planned in our initial approach .

# How did it go ?
https://github.com/career-tokens/OpenCVMeetsHTMLCanvas/assets/134730030/5d6d5220-f2ab-4ac5-9c9c-2aa8f1d7355a



