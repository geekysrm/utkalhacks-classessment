# Classessment
Bridging gaps between teachers and students

## The problem Classessment solves
1.Normally, we come to know about the performance of a student from his exams and other tests. But it many times happens that the teacher is unable to deliver his lectures fruitfully in a way that students can understand. In that case, the students are unable to learn properly and therefore become unsuccessful. We are trying to solve this problem through our platform.

We are capturing realtime live feed from installed cameras in classrooms. Our platform analyse it frame by frame and detect the emotions of students i.e. whether they are confident enough on the topic or not. We then send the results to the teacher and he can therefore retrospect and try to either retake the class or teach it in a more understandable manner.

From here, we also record the total no. of present students which minimizes the chance of proxy attendance.

2.Secondly, it happens many a times that students have doubts during lectures and they are too shy/embarrased to ask the teacher. This also hampers the learning process. So, we have made a discussion forum for the class where students can ask questions (anonymously or otherwise) and teachers can answer them. The students can also discuss among themselves. We prevent abuse of the platform in the form of vulgar or obscene comments/posts by sanitizing posts and comments.

3.We are also trying to implement a mechanism where facial recognition of a student is possible so that his attendance can be updated automatically without manual interruption.

## Challenges we ran into
1.Getting frame by frame image from a live video was a first time experience for us which took many hours of the hackathon. We used OBS software to livestream the video and we convert it to frames by using ffmpeg.

2.Getting familiar with new APIs during such a short period of time. We divided the hard work among all 4 of us so that when one was getting exhausted, the other could take his place.

3.Facial recognition to record individual attendance was part of our idea but we managed to recognize individuals in the process due to short time.

## Technologies we used

- React.js
- NodesJS
- Django
- Redux
- django rest framework
- google vision api
- kendo-ui
- paralleldots API
- ffmpeg
