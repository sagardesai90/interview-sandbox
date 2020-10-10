# ![Chad](./client/public/chad.png) Interview Sandbox

![Flow](./client/public/Final.gif)

Live app: http://interviewsandbox.com

<a href="https://www.producthunt.com/posts/interview-sandbox?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-interview-sandbox" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=203837&theme=light" alt="Interview Sandbox - Write code, video chat, and draw in realtime with others. | Product Hunt Embed" style="width: 250px; height: 54px;" width="250px" height="54px" /></a>

An application that was inspired by the fact that interviews are meant to interactive, not only in the face to face and speaking sense, but also in that they're meant to provide you a chance to show your thinking process. I sought out to build an application that lets interviewers outline their code, as well as leverage a whiteboard to show their solutions to the problem at hand.

## Features

- Code editor with real time sync

  - Javascript, Python, Ruby, Swift, Java, Go, Kotlin, PHP, R

- Whiteboard with real time sync
- Code evaluation
- Video chat
- No login needed
- Free to use

## Stack

React, Firebase (realtime database), CodeMirror for the text editor, WebRTC & sockets for video chat, and Witeboard integration. There are a couple bugs and some features still being built.

If you're using the app and need to reference your code/drawings later, just save the link!

## Available Scripts

In the project directory, you can run

### `npm install` to install the app

### `npm run start` to run the app locally

### `npm run build` to get the app ready to deploy

I deployed it to Firebase, but you can deploy elsewhere as well.

If you have any issues/bugs, please create an issue on GH!

## Future Additions

- I have received some feedback asking for a interiewer/interviewee matching capability, for practice purposes, so this will be in the works shortly!

- Cleaning up the Eval section, it is a bit clunky right now.

- Having a set of problems to practice on, this is fairly simple so I might have this complete in a couple weeks.

- Account creation so that users can keep track of their past sandboxes.

Cheers,

Sagar
