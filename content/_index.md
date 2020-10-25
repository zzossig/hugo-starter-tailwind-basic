---
home:
  - type: padding
    classes: py-0 md:py-10 bg-transparent
  - type: bioImage
    image:
      src: images/home/avatar.png
      alt: Avatar Image
      link: naver.com
      classes: my-0 w-48 h-48 rounded-full bg-red-300
  - type: text
    text:
      - "# H1"
  # - type: image
  #   image:
  #     src: images/home/avatar.png
  #     alt: Image description
  #     link: https://google.com
  #     classes: my-0 w-48 h-48 rounded-full bg-red-300
  - type: background
    useParticles: false
    classes: bg-gradient-to-r from-orange-400 via-red-500 to-pink-500
    # image: images/home/background.jpg
  - type: socialLinks
    size: 50
    classes: mx-6
    links: 
      facebook: ffffaaaaccceee
      twitter: tttwwwiiittteeerrr
  - type: typewriter
    classes: text-5xl text-green-400
    methods:
      - typeString: Hello world!
      - pauseFor: 2500
      - deleteAll: true
      - typeString: Strings can be removed
      - pauseFor: 2500
      - deleteChars: 7
      - typeString: <strong>altered!</strong>
      - pauseFor: 2500
    options:
      loop: true
      autoStart: false
---

