export const LEARNING_PATHS = [
  {
    id: 'path-foundations-circuits-motors',
    title: 'Smart Circuits & Tactile Robotics',
    subtitle: 'Physical Computing, Gear Ratios & Motor Dynamics',
    gradeLevel: 'Grades 3–5',
    gradeBand: 'foundation',
    category: 'robotics',
    categoryLabel: 'Robotics & Hardware',
    ageGroup: 'Ages 8–10',
    duration: 'Half-Day Intensive or 4-Week Workshop',
    level: 'Beginner Friendly · Zero Prep Required',
    badge: 'Tier 01 // Foundation',
    featured: true,
    summary: 'Elementary students discover how electricity transforms into physical motion. They assemble snap circuits, experiment with gear torque ratios, and construct their first autonomous rolling rover.',
    outcome: 'Each student assembles and programs a working obstacle-avoiding rover they can demonstrate.',
    skills: ['DC Geared Motors', 'Snap-Circuit Logic', 'Polarity & Current', 'Visual Block Logic', 'Mechanical Gear Ratios'],
    hardware: [
      'Dual-motor DC gearbox chassis',
      'Solderless snap-circuit logic boards',
      'Ultrasonic obstacle sensor bracket',
      'Child-safe enclosed battery hubs'
    ],
    software: 'Visual Block Coding (Flyinbird Touch Studio)',
    nep2020: 'Experiential science inquiry, foundational mechanics & spatial computational logic',
    syllabus: [
      {
        module: 'Module 01',
        title: 'Electricity in Motion: Circuits & Polarity',
        topics: 'Closed vs open circuits, polarity switches, and how batteries safely deliver kinetic energy.'
      },
      {
        module: 'Module 02',
        title: 'Torque, Wheels & Gear Ratios',
        topics: 'Mechanical advantage, gear meshing, wheel alignment, and weight distribution on 2WD chassis.'
      },
      {
        module: 'Module 03',
        title: 'Visual Logic: Loops & Collision Sensors',
        topics: 'Block programming if/then decision trees: when obstacle < 15cm, reverse and turn.'
      },
      {
        module: 'Module 04',
        title: 'Chassis Assembly & Classroom Rover Derby',
        topics: 'Final wire harness routing, autonomous obstacle course navigation, and peer presentations.'
      }
    ]
  },
  {
    id: 'path-prompt-engineering-code',
    title: 'Prompt Engineering & Algorithmic Code',
    subtitle: 'Language Model Reasoning, Structured Logic & Python Sandbox',
    gradeLevel: 'Grades 6–8',
    gradeBand: 'intermediate',
    category: 'coding',
    categoryLabel: 'Coding & Software Logic',
    ageGroup: 'Ages 11–13',
    duration: 'Full-Day Intensive or 6-Week Track',
    level: 'Beginner to Intermediate',
    badge: 'Tier 02 // Core Coding',
    featured: false,
    summary: 'Middle schoolers move beyond basic chatbot prompts to master structured AI prompt design, automated verification, and translation of logical ideas into clean Python code.',
    outcome: 'Students build a custom AI Classroom Study Buddy that solves curriculum math and science quizzes with verifiable reasoning.',
    skills: ['Chain-of-Thought Prompting', 'Python Syntax Fundamentals', 'Conditionals & Functions', 'Hallucination Spotting', 'API Schema Thinking'],
    hardware: [
      'Classroom workstation / laptop access',
      'Flyinbird Cloud LMS Interactive Sandbox',
      'Offline LLM playground bundle'
    ],
    software: 'Flyinbird LMS Python Terminal & Local Inference Playground',
    nep2020: 'Algorithmic reasoning, digital discernment & mathematical problem formulation',
    syllabus: [
      {
        module: 'Module 01',
        title: 'How LLMs Read & Reason',
        topics: 'Tokens, contextual context windows, role prompts, and system instructions.'
      },
      {
        module: 'Module 02',
        title: 'Structured Prompting & Few-Shot Templates',
        topics: 'Zero-shot vs few-shot learning, chain-of-thought problem breakdowns, and structured JSON outputs.'
      },
      {
        module: 'Module 03',
        title: 'Python Essentials: Variables, Loops & Checks',
        topics: 'Translating English logic into Python functions that test and validate AI output accuracy.'
      },
      {
        module: 'Module 04',
        title: 'Capstone: The Verified AI Study Buddy',
        topics: 'Building a classroom interactive quiz engine with custom guardrails and step-by-step solutions.'
      }
    ]
  },
  {
    id: 'path-autonomous-sonar-robotics',
    title: 'Autonomous Robotics & Sonar Telemetry',
    subtitle: 'Microcontrollers, Distance Telemetry & Sensor Feedback Loops',
    gradeLevel: 'Grades 6–8',
    gradeBand: 'intermediate',
    category: 'robotics',
    categoryLabel: 'Robotics & Hardware',
    ageGroup: 'Ages 11–13',
    duration: 'Full-Day Intensive or 6-Week Residency',
    level: 'Intermediate · Hands-On Hardware',
    badge: 'Tier 02 // Robotics',
    featured: true,
    summary: 'Students program microcontrollers to interface with sonar sound waves, infrared line detectors, and motor drivers, building autonomous robots capable of navigating mazes without human intervention.',
    outcome: 'Students build and calibrate a precision autonomous maze-solving rover with real-time sensor telemetry.',
    skills: ['Ultrasonic Distance Telemetry', 'Microcontroller Programming', 'H-Bridge Motor Drivers', 'Closed-Loop Feedback', 'PWM Speed Control'],
    hardware: [
      'Arduino-compatible microcontroller boards',
      'Dual ultrasonic HC-SR04 sonar sensors',
      'Infrared 5-channel line tracking array',
      'Precision servo steering & aluminum chassis'
    ],
    software: 'Arduino C++ & Blockly-to-Python Bridge',
    nep2020: 'Applied physics (acoustics, kinematics), embedded hardware computing & systems engineering',
    syllabus: [
      {
        module: 'Module 01',
        title: 'Microcontroller Architecture & Pin Logic',
        topics: 'Digital vs analog inputs, GPIO pins, safe power regulation, and breadboard circuitry.'
      },
      {
        module: 'Module 02',
        title: 'Acoustic Sonar & Distance Calculation',
        topics: 'Speed of sound in air (343 m/s), time-of-flight echo triangulation, and obstacle boundaries.'
      },
      {
        module: 'Module 03',
        title: 'PWM Motor Control & Steering Mathematics',
        topics: 'Differential drive turning, smooth deceleration curves, and boundary correction algorithms.'
      },
      {
        module: 'Module 04',
        title: 'The Labyrinth Challenge: Autonomous Navigation',
        topics: 'Autonomous navigation through unknown arena barriers and telemetry performance logging.'
      }
    ]
  },
  {
    id: 'path-how-ai-thinks-neural-networks',
    title: 'How AI Thinks: Neural Networks from Scratch',
    subtitle: 'Probabilities, Weights, Loss Functions & Attention Visualized',
    gradeLevel: 'Grades 8–10',
    gradeBand: 'intermediate',
    category: 'ai',
    categoryLabel: 'AI & Machine Learning',
    ageGroup: 'Ages 13–16',
    duration: 'Half-Day Intensive or 4-Week Workshop',
    level: 'Accessible Math & Visual AI',
    badge: 'Tier 02 // Machine Learning',
    featured: false,
    summary: 'Demystify the mystery behind modern AI. Students interact with visual neural network simulators to see how artificial neurons weigh signals, calculate loss, update gradients, and predict the next word or image pixel.',
    outcome: 'Students train and benchmark a live neural model on classroom drawing datasets and explain its decision math.',
    skills: ['Vector Embeddings', 'Neuron Weights & Biases', 'Softmax Probability', 'Gradient Descent Visuals', 'Model Evaluation'],
    hardware: [
      'Flyinbird Interactive Neural Simulator Station',
      'Browser-based hardware-accelerated WebGL playground'
    ],
    software: 'Flyinbird Neural Visualizer & Python Web Playground',
    nep2020: 'Applied statistics, data science intuition, AI ethics and transparency',
    syllabus: [
      {
        module: 'Module 01',
        title: 'From Linear Equations to Artificial Neurons',
        topics: 'Inputs, weights, bias offsets, and activation thresholds explained through interactive sliders.'
      },
      {
        module: 'Module 02',
        title: 'Attention & How Transformers Pick Words',
        topics: 'How ChatGPT and Claude calculate probability matrices for next-token generation.'
      },
      {
        module: 'Module 03',
        title: 'Training on Real Data: Loss & Backprop',
        topics: 'Teaching the model to recognize numbers (0–9) and watching error rates drop in real time.'
      },
      {
        module: 'Module 04',
        title: 'Model Bias, Hallucination & Safe Deployment',
        topics: 'Stress-testing models with edge cases, understanding training distribution, and ethical AI.'
      }
    ]
  },
  {
    id: 'path-computer-vision-edge-ai',
    title: 'Computer Vision & Edge AI Robotics',
    subtitle: 'Object Recognition, OpenCV Pipelines & Edge Inference Hardware',
    gradeLevel: 'Grades 9–12',
    gradeBand: 'advanced',
    category: 'ai',
    categoryLabel: 'AI & Machine Learning',
    ageGroup: 'Ages 14–18',
    duration: 'Full-Day Intensive or 8-Week Capstone Track',
    level: 'Advanced · Pre-Engineering & College Prep',
    badge: 'Tier 03 // Advanced AI',
    featured: true,
    summary: 'High school students deploy computer vision algorithms directly onto hardware micro-computers. They train custom vision models to detect faces, gesture controls, and objects, coupling camera streams to robotic actuators in real time.',
    outcome: 'Students engineer an autonomous camera turret or robotic arm that tracks and sorts physical objects using on-device vision.',
    skills: ['OpenCV Image Pipelines', 'Convolutional Feature Maps', 'Edge Neural Inference', 'Pan-Tilt Servos', 'Python Video Processing'],
    hardware: [
      'High-speed CMOS camera modules',
      'Edge AI compute board (accelerated inference)',
      'Dual-axis pan-tilt metal gear servo turret',
      'Color calibration calibration targets'
    ],
    software: 'Python 3, OpenCV, TensorFlow Lite Edge Runtime',
    nep2020: 'Pre-vocational advanced computer science, robotics instrumentation & real-time embedded systems',
    syllabus: [
      {
        module: 'Module 01',
        title: 'Digital Vision: Matrices, Grayscale & Color Spaces',
        topics: 'Pixels as RGB numerical matrices, HSV color masking, thresholding, and contour detection.'
      },
      {
        module: 'Module 02',
        title: 'Edge AI Acceleration & Object Detection',
        topics: 'Running lightweight YOLO/MobileNet models locally on edge hardware with zero internet latency.'
      },
      {
        module: 'Module 03',
        title: 'Kinematic Closed Loops: Visual Servoing',
        topics: 'Calculating bounding-box error vectors (X/Y centroid offset) and driving servo motors to track.'
      },
      {
        module: 'Module 04',
        title: 'Autonomous Sentinel Turret Showcase',
        topics: 'Building a sorting system that recognizes designated objects and sorts them into holding bays.'
      }
    ]
  },
  {
    id: 'path-planetary-space-rover',
    title: 'Planetary Rover & Space Mission Engineering',
    subtitle: 'Rocker-Bogie Suspension, Power Budgets & Autonomous Telemetry',
    gradeLevel: 'Grades 6–12',
    gradeBand: 'intermediate',
    category: 'space',
    categoryLabel: 'Space Tech & Robotics',
    ageGroup: 'Ages 12–18',
    duration: 'Multi-Day Intensive or Semester Workshop',
    level: 'Intermediate to Advanced · Multi-Disciplinary',
    badge: 'Tier 03 // Space STEM',
    featured: true,
    summary: 'Inspired by ISRO Chandrayaan and NASA Mars rovers, students tackle the extreme engineering constraints of extraterrestrial exploration: power budgeting, rocker-bogie terrain navigation, and RF ground-station telemetry.',
    outcome: 'Students build a scaled planetary explorer that traverses rocky Martian-style terrain and transmits telemetry to a classroom mission control dashboard.',
    skills: ['Rocker-Bogie Kinematics', 'Solar / Power Budgeting', 'Wireless Telemetry (RF/LoRa)', 'Environmental Sensing', 'Mission Control Logic'],
    hardware: [
      '6-wheel independent drive rocker-bogie rover chassis',
      'Multi-spectral environmental sensor payload (temp, gas, light)',
      'Long-range RF transceiver module',
      'Mini solar simulation power monitor'
    ],
    software: 'Flyinbird Ground Control Telemetry Dashboard & Python Bridge',
    nep2020: 'Integrated STEM (astronomy, physics, telecommunications & mechanical design)',
    syllabus: [
      {
        module: 'Module 01',
        title: 'Deep Space Engineering Constraints',
        topics: 'Signal latency over millions of kilometers, extreme temperature swings, and power budgets.'
      },
      {
        module: 'Module 02',
        title: 'Rocker-Bogie Mechanical Kinematics',
        topics: '6-wheel independent suspension dynamics that keep all wheels on uneven rocky surfaces.'
      },
      {
        module: 'Module 03',
        title: 'Payload Telemetry & Ground Control Link',
        topics: 'Encoding sensor packets (distance, temperature, terrain tilt) and sending data over RF link.'
      },
      {
        module: 'Module 04',
        title: 'Simulated Lunar Sample Collection Mission',
        topics: 'Autonomous sample navigation, dead-reckoning return-to-base, and mission debrief presentations.'
      }
    ]
  }
];

