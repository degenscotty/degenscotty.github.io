import type { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: 'minisquadron',
    title: 'MiniSquadron',
    category: 'programming',
    thumbnail: '/images/pic01.jpg',
    shortDescription: 'Recreation of one of my favorite childhood mobile games using SDL.',
    technologies: ['C++', 'SDL'],
    content: [
      {
        type: 'paragraph',
        text: 'MiniSquadron was one of my all time favorite childhood games. It is one of the very few mobile games I have ever really gotten into. So I decided I wanted to remake this game for my first ever "big" assignment during my studies at DAE.',
      },
      {
        type: 'media',
        media: {
          type: 'image',
          src: '/images/minisquadron.jpg',
          alt: 'MiniSquadron gameplay',
        },
      },
      {
        type: 'paragraph',
        text: 'We got a very simple SDL framework that had the most basic gameloop ever and they said: <strong>"Make whatever you feel like making, but use what we learned in class!"</strong>',
      },
      {
        type: 'paragraph',
        text: 'First of all, I had to get my hands on some assets of the game, because there was no way I was gonna recreate all those airplanes. To my surprise, I managed to extract everything I needed from the actual .apk on my phone. The next tricky part was to create a moving parallax.',
      },
      {
        type: 'media',
        media: {
          type: 'gif',
          src: '/images/paralax.gif',
          alt: 'Parallax effect demonstration',
          caption: 'The GIF above displays what the player view looks like (red rectangle) but also shows what is happening behind the scenes.',
        },
      },
      {
        type: 'paragraph',
        text: 'That is what I love the most about videogames, I always wonder what is happening behind the scenes.',
      },
      {
        type: 'paragraph',
        text: 'Sadly enough, I cannot provide a download link since that would be copyright infringement.',
      },
    ],
    links: [

    ],
  },
  {
    id: '2dgameengine',
    title: '2D Game Engine',
    category: 'programming',
    thumbnail: '/images/pic02.jpg',
    shortDescription: 'A fully working 2D game engine created from scratch during my second year.',
    technologies: ['C++', 'SDL', 'Custom Engine'],
    content: [
      {
        type: 'paragraph',
        text: 'During my second year at DAE, I came across my biggest programming challenge ever. We had to create a fully working 2D game engine starting from a framework our teacher provided.',
      },
      {
        type: 'paragraph',
        text: 'Funny enough, I didn\'t want to start from that framework and started watching <strong><a href="https://www.youtube.com/user/TheChernoProject" target="_blank" rel="noopener noreferrer">The Cherno</a></strong> on YouTube. Following his tutorials gave me a whole new perspective on how to approach certain problems. To this day I still watch his inspiring videos.',
      },
      {
        type: 'paragraph',
        text: 'I had a lot of fun creating my own 2D framework but this is still one of the most challenging assignments I have ever had. Using my engine I created 2 games to show off what it was capable of.',
      },
      {
        type: 'media-grid',
        media: [
          {
          type: 'gif',
          src: '/images/pengogameplay.gif',
          alt: 'Pengo gameplay',
        },
          {
          type: 'gif',
          src: '/images/bubblegameplay.gif',
          alt: 'Bubble Bobble gameplay',
        },
        ],
        columns: 2,
      },
      {
        type: 'paragraph',
        text: 'Pengo (game on the left) is an arcade game published by SEGA in 1982. Bubble Bobble is a platform arcade game published by Taito in 1986.',
      },
      {
        type: 'paragraph',
        text: 'Feel free to check out the source code using the link below!',
      },
    ],
    links: [
      {
        label: 'Source Code',
        url: 'https://github.com/scottvermast/2DGameEngine',
        icon: 'github',
      },
    ],
  },
  {
    id: 'geometrywars',
    title: 'Geometry Wars',
    category: 'programming',
    thumbnail: '/images/pic03.jpg',
    shortDescription: 'My first graphics programming experience recreating the iconic warping effect.',
    technologies: ['C++', 'HLSL', 'DirectX'],
    content: [
      {
        type: 'media',
        media: {
          type: 'gif',
          src: '/images/geometrywarsgameplay.gif',
          alt: 'Geometry Wars warping effect',
        },
      },
      {
        type: 'paragraph',
        text: 'My first experience with <strong>graphics programming</strong>, I got hooked. The fact you could directly talk to your graphics card and alter the way objects looked with no limits was fascinating.',
      },
      {
        type: 'paragraph',
        text: 'For my first graphics programming assignment I decided to try and recreate the warping / distortion effect from Geometry Wars. I learned how to use <strong>HLSL</strong> at a basic level. But after that, I had enough. I didn\'t dive any deeper since we started using engines.',
      },
      {
        type: 'paragraph',
        text: 'I still love to see new innovative shaders, but I haven\'t had time to revisit graphics programming since then. I\'m planning on doing so in the future, because I do believe it could help me improve overall as a game developer.',
      },
    ],
    links: [

    ],
  },
  {
    id: 'behaviourtrees',
    title: 'Behaviour Trees',
    category: 'programming',
    thumbnail: '/images/AI.jpg',
    shortDescription: 'AI implementation using behaviour trees and blackboards for agent decision making.',
    technologies: ['C++', 'AI', 'Behaviour Trees'],
    content: [
      {
        type: 'paragraph',
        text: 'My first encounter with AI was - I\'m not gonna lie - pretty difficult for me. We got a framework in which a little Agent had to survive for as long as he can.',
      },
      {
        type: 'paragraph',
        text: 'But as you can imagine... The Agent didn\'t do anything at all by itself. The first thing we had to come up with was a diagram that illustrates the Agent\'s way of thinking. Using a behaviour tree structure, I came up with a pretty simple implementation containing some selectors and sequences.',
      },
      {
        type: 'media',
        media: {
          type: 'image',
          src: '/images/diagram.jpg',
          alt: 'Behaviour tree diagram',
        },
      },
      {
        type: 'paragraph',
        text: 'Creating the tree was only the beginning. The implementation was not that easy at all. Not only did the tree need to communicate with the agent from any place possible, it had to do that every frame. Luckily, a not so efficient but rather fast solution was the use of blackboards. We learned about them in class and I was blown away. A container that could store any data that you want, easily retrievable by string keys.',
      },
      {
        type: 'paragraph',
        text: 'The moment you see your agent moving around and making decisions by itself was amazing to me. That is why I also chose my graduation work to be about self-learning agents. I must and I will dive deeper into artificial intelligence when I get the chance.',
      },
      {
        type: 'media',
        media: {
          type: 'youtube',
          src: '6XsWDaaOGtY',
          alt: 'Behaviour trees demo video',
        },
      },
    ],
    links: [

    ],
  },
  {
    id: 'projectaccess',
    title: 'Project Access',
    category: 'programming',
    thumbnail: '/images/PAMain2.png',
    shortDescription: 'A fast-paced sports arcade game with online multiplayer supporting up to 10 players.',
    technologies: ['Unreal Engine', 'C++', 'Multiplayer', 'Networking'],
    content: [
      {
        type: 'paragraph',
        text: 'Project Access is a fast-paced sports arcade online multiplayer game developed as a student project at Digital Arts & Entertainment. Players compete in teams of up to 10, scoring points while preventing opponents from scoring using a variety of abilities and team strategies.',
      },
      {
        type: 'media',
        media: {
          type: 'image',
          src: '/images/PA1.png',
        },
      },
      {
        type: 'paragraph',
        text: 'The game features 9+ abilities, character customization with level progression, multiple maps, and both first-person and third-person camera modes. Multiplayer is supported through both dedicated servers and ad-hoc networking.',
      },
      {
        type: 'media',
        media: {
          type: 'image',
          src: '/images/PA2.png',
        },
      },
      {
        type: 'paragraph',
        text: 'I worked on this project as a programmer alongside Kevan Vanderstichelen, with art by Aitor Randez, Antonio Serrano, and Mattias Vandensaffele.',
      },
      {
        type: 'media',
        media: {
          type: 'image',
          src: '/images/PA3.png',
        },
      },
      {
        type: 'media',
        media: {
          type: 'youtube',
          src: 'Zyaglqi78SQ',
          alt: 'Project Access Trailer',
        },
      },
    ],
    links: [
      {
        label: 'Play on itch.io',
        url: 'https://kevanvanderstichelen.itch.io/project-access',
        icon: 'external',
      },
    ],
  },
  {
    id: 'highpolybot',
    title: 'High Poly Bot',
    category: 'art',
    thumbnail: '/images/robot4.jpg',
    shortDescription: 'Recreation of the iconic DAE bot with high poly modeling and texturing.',
    technologies: ['3ds Max', 'Substance Painter'],
    content: [
      {
        type: 'paragraph',
        text: 'While my focus lays in programming, I also love modeling. Recreating the iconic DAE bot was a fun assignment.',
      },
      {
        type: 'paragraph',
        text: 'It was the first time I had to bake a high poly model onto a low poly one. Afterwards I textured the entire model in Substance Painter.',
      },
      {
        type: 'media-grid',
        media: [
          {
          type: 'image',
          src: '/images/robot3.jpg',
          alt: 'High poly bot render 1',
        },
          {
          type: 'image',
          src: '/images/robot2.jpg',
          alt: 'High poly bot render 2',
        },
        ],
        columns: 2,
      },
    ],
    links: [

    ],
  },
  {
    id: 'highpolymouse',
    title: 'High Poly Mouse',
    category: 'art',
    thumbnail: '/images/mouse3.jpg',
    shortDescription: 'My first ever high poly model exploring edge loops and turbosmooth.',
    technologies: ['3ds Max'],
    content: [
      {
        type: 'media-grid',
        media: [
          {
          type: 'image',
          src: '/images/mouse.jpg',
          alt: 'High poly mouse render 1',
        },
          {
          type: 'image',
          src: '/images/mouse1.jpg',
          alt: 'High poly mouse render 2',
        },
        ],
        columns: 2,
      },
      {
        type: 'paragraph',
        text: 'This mouse is my first ever high poly model. I had a lot of fun experimenting with edge loops and turbosmooth modifiers.',
      },
    ],
    links: [

    ],
  },
  {
    id: 'unreallevel',
    title: 'Unreal Level',
    category: 'art',
    thumbnail: '/images/level99.jpg',
    shortDescription: 'A futuristic/space themed level designed and built in Unreal Engine.',
    technologies: ['Unreal Engine', 'Level Design'],
    content: [
      {
        type: 'paragraph',
        text: 'Creating models or assets in general is something I like, as I have mentioned before. Designing a level is a whole other story...',
      },
      {
        type: 'paragraph',
        text: 'During classes, they taught us how important it is to start from a blockout, see how the level feels as you walk through it and only start adding more detail if you feel like your blockout is final.',
      },
      {
        type: 'paragraph',
        text: 'I had never designed any sort of level in my life and had no idea how to start. The theme for the level was supposed to be futuristic / spacy. So I started creating a room and filling it up piece by piece. Having no idea of what the rest of my level was gonna look like, I just focused on that one room.',
      },
      {
        type: 'media-grid',
        media: [
          {
          type: 'image',
          src: '/images/level1.png',
          alt: 'Unreal level screenshot 1',
        },
          {
          type: 'image',
          src: '/images/level2.png',
          alt: 'Unreal level screenshot 2',
        },
          {
          type: 'image',
          src: '/images/level3.png',
          alt: 'Unreal level screenshot 3',
        },
          {
          type: 'image',
          src: '/images/level4.png',
          alt: 'Unreal level screenshot 4',
        },
        ],
        columns: 2,
      },
      {
        type: 'paragraph',
        text: 'Soon enough, I started getting ideas for the rest of my level and started looking at references like Star Wars and Star Trek.',
      },
      {
        type: 'media-grid',
        media: [
          {
          type: 'image',
          src: '/images/level5.png',
          alt: 'Unreal level screenshot 5',
        },
          {
          type: 'image',
          src: '/images/level6.png',
          alt: 'Unreal level screenshot 6',
        },
          {
          type: 'image',
          src: '/images/level7.png',
          alt: 'Unreal level screenshot 7',
        },
          {
          type: 'image',
          src: '/images/level8.png',
          alt: 'Unreal level screenshot 8',
        },
        ],
        columns: 2,
      },
      {
        type: 'paragraph',
        text: 'Looking back at this project, I think I learned a lot. Creating / designing levels is not my strong suit but it did teach me a lot of fundamental processes that a game developer should be familiar with.',
      },
    ],
    links: [

    ],
  },
];
