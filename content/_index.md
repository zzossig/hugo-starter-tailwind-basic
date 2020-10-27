---
home:
  - type: padding
    classes: py-0 md:py-10 bg-transparent
  - type: bioImage
    image:
      src: images/home/avatar.png
      alt: Avatar Image
      link: https://gohugo.io/
      classes: mb-4 w-48 h-48 rounded-full bg-gradient-to-r dark:from-teal-400 dark:to-blue-500 from-purple-400 via-pink-500 to-red-500
  - type: text
    texts:
      - value: "Hi, I'm zzossig"
        classes: text-blue-500 text-4xl
      - value: "📚Learner🤓Nerd🌐Web Developer"
        classes: mb-4 text-xl text-red-500
  # - type: image
  #   image:
  #     src: ""
  #     alt: Image description
  #     link: https://gohugo.io/
  #     classes: my-0
  - type: background
    useParticles: false
    classes: bg-root
    # image: images/home/hugo-theme-zoe.svg
  - type: typewriter
    classes: text-5xl text-solarized-violet dark:text-solarized-green
    methods:
      - typeString: Hello world!
      - pauseFor: 2500
      - deleteAll: true
      - typeString: "Enjoy the Hugo <strong class='text-solarized-red'>Zoe</strong> theme!"
      - pauseFor: 2500
    options:
      loop: true
      autoStart: false
  - type: socialLinks
    size: 35
    classes: m-2 text-solarized-base01 hover:text-solarized-base02 dark:text-solarized-base1 dark:hover:text-gray-200
    links: 
      facebook: ffffaaaaccceee
      twitter: tttwwwiiittteeerrr
      telegram: asdga
      steam: 12351
      medium: 51
---
