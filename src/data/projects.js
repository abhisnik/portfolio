export const projects = [
  {
    id: 1,
    num: '01',
    name: 'MediKiosk',
    category: 'AI / Healthcare / Full-Stack',
    description:
      'AI-powered patient case-taking system that helps collect patient information through voice interaction, digitize medical documents using OCR, and generate structured medical summaries for doctors.',
    technologies: [
      'React.js',
      'Node.js',
      'Express.js',
      'Gemini API',
      'REST APIs',
      'OCR',
      'Speech Recognition',
      'Render',
    ],
    features: [
      'Voice-based patient intake',
      'Prescription & report OCR',
      'Automated medical summarization',
      'AI-powered patient case processing',
      'Structured information for doctors',
    ],
    problem:
      'Traditional patient intake is slow, error-prone, and produces unstructured data that is hard for doctors to process efficiently.',
    solution:
      'Built an AI-powered system that uses voice interaction and OCR to digitize and structure patient information automatically, giving doctors clean, actionable medical summaries.',
    github: 'https://github.com/abhisnik/MediKiosk',
    live: null,
    image: '/assets/projects/medikiosk.jpg',
    color: '#00f0ff',
  },
  {
    id: 2,
    num: '02',
    name: 'CodeHub',
    category: 'C++ / DSA / Full-Stack Web',
    description:
      'A full-stack C++ and DSA learning portal designed for coursework, assignments, practice problems, searching, filtering, and reference solutions.',
    technologies: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'Node.js',
      'Express.js',
      'SQLite3',
      'Render',
    ],
    features: [
      'C++ / DSA learning content',
      'Coursework support',
      'Assignments & practice problems',
      'Search & filtering',
      'Reference solutions',
    ],
    problem:
      'Students lack a centralized, searchable platform for accessing DSA coursework, practice problems, and reference solutions.',
    solution:
      'Created a full-stack learning portal with structured content, search, filtering, and assignment tracking to streamline the learning experience.',
    github: 'https://github.com/abhisnik/CodeHub',
    live: null,
    image: '/assets/projects/codehub.jpg',
    color: '#a855f7',
  },
  {
    id: 3,
    num: '03',
    name: 'Smart IoT Gas Detection',
    category: 'IoT / Embedded / Automation',
    description:
      'An LPG leakage detection and alert system using MQ-6, Arduino, and ESP8266 with real-time Telegram emergency alerts and remote monitoring.',
    technologies: [
      'Arduino Uno',
      'ESP8266 / NodeMCU',
      'MQ-6 LPG Sensor',
      'Embedded Programming',
      'Telegram API',
    ],
    features: [
      'LPG leakage detection',
      'Threshold-based detection',
      'Real-time Telegram alerts',
      'Remote monitoring',
      'Local & remote notification workflow',
    ],
    problem:
      'LPG gas leaks in households can go undetected, posing serious safety risks without real-time alerts.',
    solution:
      'Built an IoT system combining gas sensors with wireless connectivity to deliver instant Telegram notifications and enable remote monitoring.',
    github: null,
    live: null,
    image: '/assets/projects/iot-gas.jpg',
    color: '#f59e0b',
  },
];
