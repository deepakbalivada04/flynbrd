// Next-Gen Tech Academy: Master Syllabus Data
// Complete curriculum roadmap across 9 disciplines & 3 grade tiers (Explorers: 3-5, Builders: 6-10, Engineers: 11-12)

export const GRADE_TIERS = [
  { id: 'all', label: 'All Grades', sublabel: 'Complete Curriculum' },
  { id: 'tier-1', label: 'Grades 3 - 5', sublabel: 'Explorers', description: 'Hands-on discovery, visual block building & foundational intuition' },
  { id: 'tier-2', label: 'Grades 6 - 10', sublabel: 'Builders', description: 'Functional project builds, physical hardware prototyping & logic' },
  { id: 'tier-3', label: 'Grades 11 - 12', sublabel: 'Engineers', description: 'Production-grade engineering, mathematical depth & silicon deployment' },
];

export const MASTER_TRACKS = [
  {
    id: 'ai',
    title: 'Artificial Intelligence (Under the Hood)',
    shortTitle: 'Artificial Intelligence',
    slug: 'artificial-intelligence',
    tagline: 'From Turing Tests & Block ML to Neural Nets & Edge AI Deployment',
    bgImage: '/assets/tracks/ai.jpg',
    themeColor: '#533788', // Deep Purple (Logo color)
    badgeColor: 'bg-[#533788] text-white',
    accentBorder: 'border-[#533788]',
    ringColor: 'ring-[#533788]/20',
    summary: 'Master the mechanics of AI: block-based models, computer vision with webcam posture alerts, PyTorch neural networks from scratch, and edge deployment to the ESP32-S3 and Jetson Nano.',
    disciplines: ['Computer Vision', 'Deep Learning', 'PyTorch', 'Edge AI', 'Decision Trees'],
    tiers: [
      {
        tierId: 'tier-1',
        tierName: 'Tier 1: AI Explorers',
        gradeLevel: 'Grades 3 - 5',
        modules: [
          {
            moduleNumber: 1,
            title: 'Meet Your Digital Brain',
            chapters: [
              'Chapter 1: Is Your Computer Actually Smart? (The Turing Test)',
              'Chapter 2: How AI is Secretly Hiding in Your House!',
              'Chapter 3: The "If-Then" Game: Dumb Bots vs. Smart Bots'
            ]
          },
          {
            moduleNumber: 2,
            title: 'Machine Learning Magic (Block-Based)',
            chapters: [
              'Chapter 1: What Does "Training" an AI Actually Mean?',
              'Chapter 2: The Dataset Secret: Feeding Data to the Brain',
              'Chapter 3: Build an AI that Beats You at Rock-Paper-Scissors!'
            ]
          }
        ]
      },
      {
        tierId: 'tier-2',
        tierName: 'Tier 2: AI Builders',
        gradeLevel: 'Grades 6 - 10',
        modules: [
          {
            moduleNumber: 1,
            title: 'Unlocking Machine Learning',
            chapters: [
              'Chapter 1: You Don’t Need Math to Train AI (Yet!)',
              'Chapter 2: Let’s Build a "Spam or Not Spam" Detector',
              'Chapter 3: Decision Trees: How AI Makes Up Its Mind'
            ]
          },
          {
            moduleNumber: 2,
            title: 'Computer Vision Adventures',
            chapters: [
              'Chapter 1: Giving Vision to Your Webcam!',
              'Chapter 2: Color Tracking: Make an Object Act Like a Mouse Pointer',
              'Chapter 3: Posture Police: Build an AI that Yells When You Slouch!'
            ]
          },
          {
            moduleNumber: 3,
            title: 'Into the Deep (Neural Networks)',
            chapters: [
              'Chapter 1: Copying the Human Brain (Digital Neurons)',
              'Chapter 2: Training a Network to Play Flappy Bird!',
              'Chapter 3: DeepFakes & GenAI: The Good and the Bad'
            ]
          }
        ]
      },
      {
        tierId: 'tier-3',
        tierName: 'Tier 3: AI Engineers',
        gradeLevel: 'Grades 11 - 12',
        modules: [
          {
            moduleNumber: 1,
            title: 'Hardcore Machine Learning (Python)',
            chapters: [
              'Chapter 1: Scraping and Cleaning Messy Data (The Real Work)',
              'Chapter 2: Linear Regression: Predicting the Future!',
              'Chapter 3: Kaggle Crash Course: Competing with Global Data'
            ]
          },
          {
            moduleNumber: 2,
            title: 'Advanced Computer Vision (OpenCV & YOLO)',
            chapters: [
              'Chapter 1: Matrices: How Computers "Read" Pixels',
              'Chapter 2: Object Tracking with YOLO (You Only Look Once)',
              'Chapter 3: Stereo Vision: 3D Depth Perception for Robots'
            ]
          },
          {
            moduleNumber: 3,
            title: 'Deep Learning (PyTorch)',
            chapters: [
              'Chapter 1: Neural Networks from Scratch (The Math Unlocked)',
              'Chapter 2: Backpropagation: How AI Learns from Mistakes',
              'Chapter 3: Transformers: Understanding the LLM Core'
            ]
          },
          {
            moduleNumber: 4,
            title: 'Edge AI & Hardware Deployment',
            chapters: [
              'Chapter 1: Cloud vs. Edge: Why We Need Local AI',
              'Chapter 2: Shrinking Models for the ESP32-S3 Microcontroller!',
              'Chapter 3: Final Project: Deploying AI to the Jetson Nano'
            ]
          }
        ]
      }
    ]
  },
  {
    id: '3d-printing',
    title: '3D Printing & Prototyping',
    shortTitle: '3D Printing & Prototyping',
    slug: '3d-printing-prototyping',
    tagline: 'From Tinkercad Keychains to Parametric Fusion 360 & CoreXY Farms',
    bgImage: '/assets/tracks/3d-printing.jpg',
    themeColor: '#EE7819', // Warm Orange (Logo color)
    badgeColor: 'bg-[#EE7819] text-white',
    accentBorder: 'border-[#EE7819]',
    ringColor: 'ring-[#EE7819]/20',
    summary: 'Turn imagination into physical reality: first-layer calibration, Tinkercad modeling, PETG/TPU material science, snap-fit tolerance design in Fusion 360, and automated OctoPrint print farms.',
    disciplines: ['3D Modeling', 'Fusion 360', 'Slicing & G-Code', 'Material Science', 'Klipper Firmware'],
    tiers: [
      {
        tierId: 'tier-1',
        tierName: 'Tier 1: 3D Explorers',
        gradeLevel: 'Grades 3 - 5',
        modules: [
          {
            moduleNumber: 1,
            title: 'The Magic Plastic Factory',
            chapters: [
              'Chapter 1: How Does a 3D Printer Actually Work?',
              'Chapter 2: Downloading Your First Toy (Thingiverse Secrets)'
            ]
          },
          {
            moduleNumber: 2,
            title: '3D Design for Kids',
            chapters: [
              'Chapter 1: Tinkercad Basics: Stacking Shapes',
              'Chapter 2: Printing Your First Custom Keychain'
            ]
          }
        ]
      },
      {
        tierId: 'tier-2',
        tierName: 'Tier 2: 3D Builders',
        gradeLevel: 'Grades 6 - 10',
        modules: [
          {
            moduleNumber: 1,
            title: 'The Ultimate Print Crash Course',
            chapters: [
              'Chapter 1: Nailing the Perfect First Layer Every Time',
              'Chapter 2: Stop Your Prints From Turning Into Spaghetti!'
            ]
          },
          {
            moduleNumber: 2,
            title: 'Advanced Slicing Secrets',
            chapters: [
              'Chapter 1: Supports: How to Print in Mid-Air!',
              'Chapter 2: PLA vs. PETG vs. TPU: Which Plastic Survives?'
            ]
          },
          {
            moduleNumber: 3,
            title: 'Upgrades & Hardware Maintenance',
            chapters: [
              'Chapter 1: Changing Nozzles and Fixing Clogs',
              'Chapter 2: Building a Climate Enclosure for Stronger Parts'
            ]
          }
        ]
      },
      {
        tierId: 'tier-3',
        tierName: 'Tier 3: Prototyping Engineers',
        gradeLevel: 'Grades 11 - 12',
        modules: [
          {
            moduleNumber: 1,
            title: 'Parametric Design (Fusion 360)',
            chapters: [
              'Chapter 1: Steal These 3D Design Secrets (Fusion Hacks)',
              'Chapter 2: Designing Parts that SNAP Together Perfectly'
            ]
          },
          {
            moduleNumber: 2,
            title: 'Advanced Engineering Materials',
            chapters: [
              'Chapter 1: Printing with Nylon and Polycarbonate',
              'Chapter 2: Carbon Fiber Blends for Structural Integrity'
            ]
          },
          {
            moduleNumber: 3,
            title: 'Print Farm Logistics',
            chapters: [
              'Chapter 1: OctoPrint: Remote Monitoring and Automation',
              'Chapter 2: Mass Producing Your Invention Efficiently'
            ]
          },
          {
            moduleNumber: 4,
            title: 'Printer Engineering & Firmware',
            chapters: [
              'Chapter 1: Custom Firmware: Klipper vs. Marlin',
              'Chapter 2: CoreXY vs. Cartesian Architectures Explained'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'space',
    title: 'Space and Astronomy',
    shortTitle: 'Space & Astronomy',
    slug: 'space-astronomy',
    tagline: 'From Backyard Stargazing to Orbital Mechanics & Kerbal Mars Missions',
    bgImage: '/assets/tracks/space.jpg',
    themeColor: '#D4252A', // Crimson Red (Logo color)
    badgeColor: 'bg-[#D4252A] text-white',
    accentBorder: 'border-[#D4252A]',
    ringColor: 'ring-[#D4252A]/20',
    summary: 'Explore the cosmos: smartphone astrophotography, telescope optical physics, gravitational assists, orbital mechanics math, star spectroscopy, and Kerbal rocket engine simulations.',
    disciplines: ['Orbital Mechanics', 'Astrophotography', 'Spectroscopy', 'Rocket Telemetry', 'Aerospace Simulation'],
    tiers: [
      {
        tierId: 'tier-1',
        tierName: 'Tier 1: Space Explorers',
        gradeLevel: 'Grades 3 - 5',
        modules: [
          {
            moduleNumber: 1,
            title: 'Backyard Stargazing',
            chapters: [
              'Chapter 1: Map Any Constellation With Just Your Phone!',
              'Chapter 2: Why the Moon Changes Shape (Phases Explained)'
            ]
          },
          {
            moduleNumber: 2,
            title: 'The Solar System Tour',
            chapters: [
              'Chapter 1: Why Mars is Red and Saturn has Rings',
              'Chapter 2: Is Pluto a Planet? The Great Debate'
            ]
          }
        ]
      },
      {
        tierId: 'tier-2',
        tierName: 'Tier 2: Space Builders',
        gradeLevel: 'Grades 6 - 10',
        modules: [
          {
            moduleNumber: 1,
            title: 'Hacking the Night Sky',
            chapters: [
              'Chapter 1: Catching the Space Station Flying Over Your House!',
              'Chapter 2: Telescopes 101: How Lenses Bend Light'
            ]
          },
          {
            moduleNumber: 2,
            title: 'Astro-Photography Basics',
            chapters: [
              'Chapter 1: Smartphone Telescope Mounts Explained',
              'Chapter 2: Take Insane Moon Photos (Editing Tricks)'
            ]
          },
          {
            moduleNumber: 3,
            title: 'Beyond Our Neighborhood',
            chapters: [
              'Chapter 1: Hunting Exoplanets: Are We Alone?',
              'Chapter 2: Black Holes: The Monsters of the Universe'
            ]
          }
        ]
      },
      {
        tierId: 'tier-3',
        tierName: 'Tier 3: Astrophysicists',
        gradeLevel: 'Grades 11 - 12',
        modules: [
          {
            moduleNumber: 1,
            title: 'Deep Space & Orbital Mechanics',
            chapters: [
              'Chapter 1: Why the Stars Move (And How to Track Them)',
              'Chapter 2: Understanding Orbits and Gravity Assists'
            ]
          },
          {
            moduleNumber: 2,
            title: 'Astrophysics Math',
            chapters: [
              'Chapter 1: Gravity Equations and Newton’s Laws',
              'Chapter 2: Calculating Escape Velocity for Rockets'
            ]
          },
          {
            moduleNumber: 3,
            title: 'Spectroscopy',
            chapters: [
              'Chapter 1: Light Waves and the Electromagnetic Spectrum',
              'Chapter 2: Finding Out What Distant Stars Are Made Of!'
            ]
          },
          {
            moduleNumber: 4,
            title: 'Aerospace Simulation',
            chapters: [
              'Chapter 1: Kerbal Space Program: Designing a Rocket Engine',
              'Chapter 2: Planning a Realistic Mission to Mars'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'iot',
    title: 'IoT (Internet of Things)',
    shortTitle: 'IoT (Internet of Things)',
    slug: 'iot-internet-of-things',
    tagline: 'From Sound-Activated LEDs to ESP32 Mesh Swarms & Cloud Dashboards',
    bgImage: '/assets/tracks/iot.jpg',
    themeColor: '#109599', // Teal (Logo feather color)
    badgeColor: 'bg-[#109599] text-white',
    accentBorder: 'border-[#109599]',
    ringColor: 'ring-[#109599]/20',
    summary: 'Connect physical hardware to the internet: clap-triggered sensors, Blynk smartphone dashboards, Alexa voice integration, ESP-NOW peer mesh networks, and industrial OTA fleet management.',
    disciplines: ['ESP32', 'MQTT Protocols', 'REST APIs', 'Mesh Swarms', 'Smart Home Automation'],
    tiers: [
      {
        tierId: 'tier-1',
        tierName: 'Tier 1: Smart Explorers',
        gradeLevel: 'Grades 3 - 5',
        modules: [
          {
            moduleNumber: 1,
            title: 'The Magic of Sensors',
            chapters: [
              'Chapter 1: Making Things Light Up When You Clap!',
              'Chapter 2: Building a Security Alarm for Your Bedroom'
            ]
          },
          {
            moduleNumber: 2,
            title: 'Smart Room Hacks',
            chapters: [
              'Chapter 1: Auto-Lighting: LED Strips that React to You',
              'Chapter 2: The Remote Controlled Desktop Fan'
            ]
          }
        ]
      },
      {
        tierId: 'tier-2',
        tierName: 'Tier 2: IoT Builders',
        gradeLevel: 'Grades 6 - 10',
        modules: [
          {
            moduleNumber: 1,
            title: 'Welcome to the Internet of Things',
            chapters: [
              'Chapter 1: Make an LED Blink From the Other Side of the World!',
              'Chapter 2: Reading Sensors: Plant Moisture Text Alerts'
            ]
          },
          {
            moduleNumber: 2,
            title: 'Cloud Dashboards',
            chapters: [
              'Chapter 1: Intro to the Blynk App UI',
              'Chapter 2: Controlling Hardware with Your Phone'
            ]
          },
          {
            moduleNumber: 3,
            title: 'Smart Home Integrations',
            chapters: [
              'Chapter 1: Making Alexa Talk to Your Arduino',
              'Chapter 2: Automating Your Room with IFTTT'
            ]
          }
        ]
      },
      {
        tierId: 'tier-3',
        tierName: 'Tier 3: IoT Engineers',
        gradeLevel: 'Grades 11 - 12',
        modules: [
          {
            moduleNumber: 1,
            title: 'Wireless Sorcery (ESP32)',
            chapters: [
              'Chapter 1: Build a Secret Web Server on a $5 Microcontroller',
              'Chapter 2: Dual-Core Processing on the ESP32'
            ]
          },
          {
            moduleNumber: 2,
            title: 'Professional Protocols',
            chapters: [
              'Chapter 1: MQTT: How Smart Homes Actually Communicate',
              'Chapter 2: RESTful APIs: Fetching Live Weather Data'
            ]
          },
          {
            moduleNumber: 3,
            title: 'Mesh Networking',
            chapters: [
              'Chapter 1: ESP-NOW: Making Boards Whisper to Each Other',
              'Chapter 2: Building a Sensor Swarm Array'
            ]
          },
          {
            moduleNumber: 4,
            title: 'Enterprise IoT Deployment',
            chapters: [
              'Chapter 1: Over-The-Air (OTA) Updates: Flashing Code via Wi-Fi',
              'Chapter 2: Securing IoT Devices and Fleet Management'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'robotics',
    title: 'Robotics (Kit Development)',
    shortTitle: 'Robotics Kit Development',
    slug: 'robotics-kit-development',
    tagline: 'From Motor Wiring to Autonomous Ultrasonic Rovers, PID & SLAM Lidar',
    bgImage: '/assets/tracks/robotics.jpg',
    themeColor: '#1D9D53', // Leaf Green (Logo color)
    badgeColor: 'bg-[#1D9D53] text-white',
    accentBorder: 'border-[#1D9D53]',
    ringColor: 'ring-[#1D9D53]/20',
    summary: 'Build working robots from the ground up: Bluetooth phone racing bots, obstacle avoidance ultrasonic algorithms, robotic gripper arms, PID stabilization controllers, and 2D Lidar SLAM mapping.',
    disciplines: ['Autonomous Rovers', 'PID Controllers', 'Lidar & SLAM', 'Robotic Grippers', 'IMU Gyros'],
    tiers: [
      {
        tierId: 'tier-1',
        tierName: 'Tier 1: Robo-Explorers',
        gradeLevel: 'Grades 3 - 5',
        modules: [
          {
            moduleNumber: 1,
            title: 'Waking Up the Machine',
            chapters: [
              'Chapter 1: Unboxing the Brain: Let’s Build a Robot!',
              'Chapter 2: Making Motors Spin (Without Breaking Them)'
            ]
          },
          {
            moduleNumber: 2,
            title: 'Remote Control Bots',
            chapters: [
              'Chapter 1: Wiring a Joystick to Move Your Wheels',
              'Chapter 2: Robot Racing: Bluetooth Phone Control'
            ]
          }
        ]
      },
      {
        tierId: 'tier-2',
        tierName: 'Tier 2: Robo-Builders',
        gradeLevel: 'Grades 6 - 10',
        modules: [
          {
            moduleNumber: 1,
            title: 'Autonomous Mayhem',
            chapters: [
              'Chapter 1: Teaching Your Bot to DODGE Walls! (Ultrasonics)',
              'Chapter 2: Taming the PWM: Smooth Turning and Speed Control'
            ]
          },
          {
            moduleNumber: 2,
            title: 'The Racing Setup',
            chapters: [
              'Chapter 1: Line Following Logic and IR Sensors',
              'Chapter 2: Beating the Obstacle Course Challenge'
            ]
          },
          {
            moduleNumber: 3,
            title: 'Robotic Arm Mechanics',
            chapters: [
              'Chapter 1: Servo Motors 101: Precise Angles',
              'Chapter 2: Building a Gripper to Pick Up Objects'
            ]
          }
        ]
      },
      {
        tierId: 'tier-3',
        tierName: 'Tier 3: Robotics Engineers',
        gradeLevel: 'Grades 11 - 12',
        modules: [
          {
            moduleNumber: 1,
            title: 'Advanced Kinematics',
            chapters: [
              'Chapter 1: PID Controllers: Stop Your Robot From Wobbling!',
              'Chapter 2: Encoders: Measuring Exact Motor Rotations'
            ]
          },
          {
            moduleNumber: 2,
            title: 'Advanced Sensor Integration',
            chapters: [
              'Chapter 1: I2C Wiring Hacks: Adding 10 Sensors on 2 Wires',
              'Chapter 2: IMUs and Gyroscopes for Balance'
            ]
          },
          {
            moduleNumber: 3,
            title: 'Spatial Awareness',
            chapters: [
              'Chapter 1: Lidar Basics: Seeing the Room in 2D',
              'Chapter 2: Intro to SLAM (Simultaneous Localization and Mapping)'
            ]
          },
          {
            moduleNumber: 4,
            title: 'Hardware Architecture',
            chapters: [
              'Chapter 1: Power Distribution and Selecting Battery Chemistries',
              'Chapter 2: Designing a Custom Chassis for 3D Printing'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'prompt-engineering',
    title: 'Prompt Engineering',
    shortTitle: 'Prompt Engineering',
    slug: 'prompt-engineering',
    tagline: 'From Story Prompts & Comic Books to Chain-of-Thought & Autonomous Agents',
    bgImage: '/assets/tracks/prompt-engineering.jpg',
    themeColor: '#2576BC', // Primary Blue (Logo color)
    badgeColor: 'bg-[#2576BC] text-white',
    accentBorder: 'border-[#2576BC]',
    ringColor: 'ring-[#2576BC]/20',
    summary: 'Harness the true power of large language models: persona crafting, reverse prompt engineering, chain-of-thought reasoning, prompt injection security, API chaining, and autonomous multi-agent systems.',
    disciplines: ['Chain-of-Thought', 'Few-Shot Learning', 'Prompt Security', 'Autonomous Agents', 'API Chaining'],
    tiers: [
      {
        tierId: 'tier-1',
        tierName: 'Tier 1: AI Whisperers',
        gradeLevel: 'Grades 3 - 5',
        modules: [
          {
            moduleNumber: 1,
            title: 'Talking to Computers',
            chapters: [
              'Chapter 1: How to Ask AI for the Best Bedtime Story',
              'Chapter 2: The Magic Word: Why Details Matter'
            ]
          },
          {
            moduleNumber: 2,
            title: 'AI Creativity',
            chapters: [
              'Chapter 1: Writing a Comic Book with ChatGPT',
              'Chapter 2: Keeping Safe: What Not to Tell the AI'
            ]
          }
        ]
      },
      {
        tierId: 'tier-2',
        tierName: 'Tier 2: Prompt Builders',
        gradeLevel: 'Grades 6 - 10',
        modules: [
          {
            moduleNumber: 1,
            title: 'Stop Writing Bad Prompts',
            chapters: [
              'Chapter 1: The "Jedi Mind Trick" for Better AI Answers',
              'Chapter 2: Tone and Style Hacking (Sounding Human)'
            ]
          },
          {
            moduleNumber: 2,
            title: 'Role-Prompting',
            chapters: [
              'Chapter 1: Forcing the AI to be a Math Genius or Tutor',
              'Chapter 2: Creating Historical Character Simulations'
            ]
          },
          {
            moduleNumber: 3,
            title: 'Reverse Engineering',
            chapters: [
              'Chapter 1: Making AI Write the Perfect Prompt for You',
              'Chapter 2: Formatting Outputs (Tables, JSON, Bullet Points)'
            ]
          }
        ]
      },
      {
        tierId: 'tier-3',
        tierName: 'Tier 3: Prompt Engineers',
        gradeLevel: 'Grades 11 - 12',
        modules: [
          {
            moduleNumber: 1,
            title: 'Advanced AI Architectures',
            chapters: [
              'Chapter 1: Chain of Thought (CoT): Making LLMs Think Step-by-Step',
              'Chapter 2: Few-Shot and Zero-Shot Learning Prompting'
            ]
          },
          {
            moduleNumber: 2,
            title: 'AI Security & Ethics',
            chapters: [
              'Chapter 1: Jailbreaking the Rules (Ethically!)',
              'Chapter 2: Defending Against Prompt Injections'
            ]
          },
          {
            moduleNumber: 3,
            title: 'API Integration',
            chapters: [
              'Chapter 1: System Prompts vs. User Prompts',
              'Chapter 2: Chaining Prompts: Connecting 5 AIs Together via Code'
            ]
          },
          {
            moduleNumber: 4,
            title: 'Building Custom Agents',
            chapters: [
              'Chapter 1: Memory and Managing the Context Window Limits',
              'Chapter 2: Deploying a Specialized Autonomous Agent'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'using-ai',
    title: 'Using AI (Everyday Tools)',
    shortTitle: 'Using AI (Everyday Tools)',
    slug: 'using-ai-everyday-tools',
    tagline: 'From AI Music & Avatars to Homework Automation, Zapier & RAG Chatbots',
    bgImage: '/assets/tracks/using-ai.jpg',
    themeColor: '#F9BA06', // Golden Yellow (Logo color)
    badgeColor: 'bg-[#F9BA06] text-slate-900 font-bold',
    accentBorder: 'border-[#F9BA06]',
    ringColor: 'ring-[#F9BA06]/20',
    summary: 'Leverage modern AI tools for maximum real-world leverage: AI songs in 3 minutes, talking video avatars, voice cloning, automated homework research, Zapier workflows, and custom RAG PDF chatbots.',
    disciplines: ['Voice Cloning', 'RAG Chatbots', 'Workflow Automation', 'Video AI', 'Zapier Integrations'],
    tiers: [
      {
        tierId: 'tier-1',
        tierName: 'Tier 1: AI Creators',
        gradeLevel: 'Grades 3 - 5',
        modules: [
          {
            moduleNumber: 1,
            title: 'Creating with AI',
            chapters: [
              'Chapter 1: Painting with Words (Intro to AI Art)',
              'Chapter 2: Making Your Own Theme Song in 3 Minutes!'
            ]
          },
          {
            moduleNumber: 2,
            title: 'Digital Magic Tricks',
            chapters: [
              'Chapter 1: Removing Backgrounds Like a Pro',
              'Chapter 2: Creating Your Own Talking Avatar'
            ]
          }
        ]
      },
      {
        tierId: 'tier-2',
        tierName: 'Tier 2: AI Hackers',
        gradeLevel: 'Grades 6 - 10',
        modules: [
          {
            moduleNumber: 1,
            title: 'Supercharge Your Homework',
            chapters: [
              'Chapter 1: Do 5 Hours of Research in 15 Minutes',
              'Chapter 2: Turn Your Notes into a Presentation Instantly'
            ]
          },
          {
            moduleNumber: 2,
            title: 'Audio & Voice',
            chapters: [
              'Chapter 1: Voice Cloning (Sound Like Anyone!)',
              'Chapter 2: Cleaning Bad Audio with AI Tools'
            ]
          },
          {
            moduleNumber: 3,
            title: 'Media Generation',
            chapters: [
              'Chapter 1: AI Video Editing Hacks',
              'Chapter 2: Generating B-Roll and Cinematic Shots'
            ]
          }
        ]
      },
      {
        tierId: 'tier-3',
        tierName: 'Tier 3: AI Automators',
        gradeLevel: 'Grades 11 - 12',
        modules: [
          {
            moduleNumber: 1,
            title: 'The Productivity Engine',
            chapters: [
              'Chapter 1: Turning Spreadsheets into Apps Automatically',
              'Chapter 2: Analyzing Large Datasets with AI Tools'
            ]
          },
          {
            moduleNumber: 2,
            title: 'Workflows & Zapier',
            chapters: [
              'Chapter 1: Zapier + AI: Connecting Web Apps',
              'Chapter 2: Let AI Auto-Draft Replies to Annoying Emails'
            ]
          },
          {
            moduleNumber: 3,
            title: 'Custom Chatbots',
            chapters: [
              'Chapter 1: Intro to RAG (Retrieval-Augmented Generation)',
              'Chapter 2: Building a Chatbot Trained on Your Own PDFs'
            ]
          },
          {
            moduleNumber: 4,
            title: 'AI for Business',
            chapters: [
              'Chapter 1: Generating High-Converting Marketing Copy',
              'Chapter 2: Building an AI SaaS MVP in a Weekend'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'coding',
    title: 'Coding',
    shortTitle: 'Coding & Software Engineering',
    slug: 'coding-software-engineering',
    tagline: 'From Scratch Game Modding to Python Scripts, Node.js & Full-Stack Cloud Apps',
    bgImage: '/assets/tracks/coding.jpg',
    themeColor: '#2576BC', // Primary Blue (Logo color)
    badgeColor: 'bg-[#2576BC] text-white',
    accentBorder: 'border-[#2576BC]',
    ringColor: 'ring-[#2576BC]/20',
    summary: 'Write real software: Scratch 20-minute game builds, Python automation scripts, web fundamentals with HTML/CSS/JS, Object-Oriented Programming, Node.js APIs, and full-stack React deployment.',
    disciplines: ['Python', 'Scratch', 'JavaScript', 'Node.js & Express', 'MongoDB & Git'],
    tiers: [
      {
        tierId: 'tier-1',
        tierName: 'Tier 1: Code Explorers',
        gradeLevel: 'Grades 3 - 5',
        modules: [
          {
            moduleNumber: 1,
            title: 'Building Blocks',
            chapters: [
              'Chapter 1: Loops: Making the Computer Do the Boring Work',
              'Chapter 2: Variables: Keeping Score in Your Game'
            ]
          },
          {
            moduleNumber: 2,
            title: 'Modding & Games',
            chapters: [
              'Chapter 1: Coding a Game in Under 20 Minutes (Scratch)',
              'Chapter 2: Making Characters Move and Add Sound Effects'
            ]
          }
        ]
      },
      {
        tierId: 'tier-2',
        tierName: 'Tier 2: Code Builders',
        gradeLevel: 'Grades 6 - 10',
        modules: [
          {
            moduleNumber: 1,
            title: 'Speaking Machine Language',
            chapters: [
              'Chapter 1: Write Your First Line of Python TODAY',
              'Chapter 2: "If This, Then That" - The Only Logic You Need'
            ]
          },
          {
            moduleNumber: 2,
            title: 'Python Automation',
            chapters: [
              'Chapter 1: Why Your Code Broke (And How to Fix It FAST)',
              'Chapter 2: Hacking Together a Script to Automate Your Day'
            ]
          },
          {
            moduleNumber: 3,
            title: 'Web Fundamentals',
            chapters: [
              'Chapter 1: HTML/CSS Intro: Building Your Portfolio',
              'Chapter 2: Making Things Clickable with JavaScript'
            ]
          }
        ]
      },
      {
        tierId: 'tier-3',
        tierName: 'Tier 3: Software Engineers',
        gradeLevel: 'Grades 11 - 12',
        modules: [
          {
            moduleNumber: 1,
            title: 'Real-World Development',
            chapters: [
              'Chapter 1: Object-Oriented Programming (OOP) Demystified',
              'Chapter 2: Git & GitHub: The Developer Survival Guide'
            ]
          },
          {
            moduleNumber: 2,
            title: 'APIs & The Internet',
            chapters: [
              'Chapter 1: What is an API? Fetching Live Data',
              'Chapter 2: JSON: The Language of the Web'
            ]
          },
          {
            moduleNumber: 3,
            title: 'The Backend Server',
            chapters: [
              'Chapter 1: Setting up Node.js and Express',
              'Chapter 2: Connecting a Database (MongoDB/PostgreSQL)'
            ]
          },
          {
            moduleNumber: 4,
            title: 'Full-Stack Integration',
            chapters: [
              'Chapter 1: Bridging the React Frontend with the Backend',
              'Chapter 2: Deploying Your App to the Cloud (AWS/Vercel)'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'circuit-designing',
    title: 'Circuit Designing',
    shortTitle: 'Circuit Designing & PCB',
    slug: 'circuit-designing-pcb',
    tagline: 'From Play-Doh Squishy Circuits to Breadboards, Soldering & EasyEDA PCBs',
    bgImage: '/assets/tracks/circuit-designing.jpg',
    themeColor: '#EE7819', // Orange (Logo color)
    badgeColor: 'bg-[#EE7819] text-white',
    accentBorder: 'border-[#EE7819]',
    ringColor: 'ring-[#EE7819]/20',
    summary: 'Master electronic hardware: conductive dough squishy circuits, copper tape paper circuits, multimeter breadboard debugging, soldering masterclass, schematic capture, and EasyEDA custom PCB fabrication.',
    disciplines: ['Schematic Capture', 'EasyEDA', 'Soldering', 'Gerber Files', 'SMD Assembly'],
    tiers: [
      {
        tierId: 'tier-1',
        tierName: 'Tier 1: Zap Explorers',
        gradeLevel: 'Grades 3 - 5',
        modules: [
          {
            moduleNumber: 1,
            title: 'The Magic of Electricity',
            chapters: [
              'Chapter 1: Don’t Let the Magic Smoke Out! (Batteries and LEDs)',
              'Chapter 2: Squishy Circuits: Making Wires out of Play-Doh!'
            ]
          },
          {
            moduleNumber: 2,
            title: 'Paper Circuits',
            chapters: [
              'Chapter 1: Copper Tape Magic and Coin Cells',
              'Chapter 2: Building Light-Up Greeting Cards'
            ]
          }
        ]
      },
      {
        tierId: 'tier-2',
        tierName: 'Tier 2: Circuit Builders',
        gradeLevel: 'Grades 6 - 10',
        modules: [
          {
            moduleNumber: 1,
            title: 'Components 101',
            chapters: [
              'Chapter 1: Voltage, Current, and Resistance (Water Pipe Analogy)',
              'Chapter 2: Resistors, Capacitors, and Diodes Explained'
            ]
          },
          {
            moduleNumber: 2,
            title: 'Prototyping',
            chapters: [
              'Chapter 1: Stop Wiring Things Wrong (Breadboard Masterclass)',
              'Chapter 2: Debugging a Dead Circuit Using a Multimeter'
            ]
          },
          {
            moduleNumber: 3,
            title: 'Permanent Circuits',
            chapters: [
              'Chapter 1: Soldering 101: Stop Making Ugly Joints',
              'Chapter 2: Moving from Breadboards to Protoboards'
            ]
          }
        ]
      },
      {
        tierId: 'tier-3',
        tierName: 'Tier 3: PCB Engineers',
        gradeLevel: 'Grades 11 - 12',
        modules: [
          {
            moduleNumber: 1,
            title: 'Schematics',
            chapters: [
              'Chapter 1: Reading Alien Maps (Understanding Schematics)',
              'Chapter 2: Drawing Your Own Circuit Diagrams'
            ]
          },
          {
            moduleNumber: 2,
            title: 'Digital Design (EasyEDA)',
            chapters: [
              'Chapter 1: Designing Your First Custom Circuit Board',
              'Chapter 2: Routing Traces: The Ultimate PCB Puzzle Game'
            ]
          },
          {
            moduleNumber: 3,
            title: 'Advanced Layout',
            chapters: [
              'Chapter 1: Multi-Layer Boards and Ground Planes',
              'Chapter 2: Vias and Trace Width Calculations'
            ]
          },
          {
            moduleNumber: 4,
            title: 'Manufacturing',
            chapters: [
              'Chapter 1: Generating Gerber Files for Production',
              'Chapter 2: Ordering from JLCPCB and SMD Reflow Soldering'
            ]
          }
        ]
      }
    ]
  }
];

export function getTrackBySlugOrId(identifier) {
  if (!identifier) return null;
  return MASTER_TRACKS.find(t => t.id === identifier || t.slug === identifier) || null;
}

