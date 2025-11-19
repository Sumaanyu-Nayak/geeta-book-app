const mongoose = require('mongoose');
require('dotenv').config();
const Chapter = require('../models/Chapter');
const Activity = require('../models/Activity');
const Verse = require('../models/Verse');
const VerseActivity = require('../models/VerseActivity');

const chapters = [
  { number: 1, titleSanskrit: 'अर्जुनविषादयोग', titleEnglish: 'The Yoga of Arjuna\'s Dejection', titleHindi: 'अर्जुन विषाद योग', verseCount: 47 },
  { number: 2, titleSanskrit: 'सांख्ययोग', titleEnglish: 'The Yoga of Knowledge', titleHindi: 'सांख्य योग', verseCount: 72 },
  { number: 3, titleSanskrit: 'कर्मयोग', titleEnglish: 'The Yoga of Action', titleHindi: 'कर्म योग', verseCount: 43 },
  { number: 4, titleSanskrit: 'ज्ञानकर्मसंन्यासयोग', titleEnglish: 'The Yoga of Wisdom and Action', titleHindi: 'ज्ञान कर्म संन्यास योग', verseCount: 42 },
  { number: 5, titleSanskrit: 'कर्मसंन्यासयोग', titleEnglish: 'The Yoga of Renunciation', titleHindi: 'कर्म संन्यास योग', verseCount: 29 },
  { number: 6, titleSanskrit: 'आत्मसंयमयोग', titleEnglish: 'The Yoga of Meditation', titleHindi: 'आत्म संयम योग', verseCount: 47 },
  { number: 7, titleSanskrit: 'ज्ञानविज्ञानयोग', titleEnglish: 'The Yoga of Knowledge and Wisdom', titleHindi: 'ज्ञान विज्ञान योग', verseCount: 30 },
  { number: 8, titleSanskrit: 'अक्षरब्रह्मयोग', titleEnglish: 'The Yoga of the Imperishable Brahman', titleHindi: 'अक्षर ब्रह्म योग', verseCount: 28 },
  { number: 9, titleSanskrit: 'राजविद्याराजगुह्ययोग', titleEnglish: 'The Yoga of Royal Knowledge', titleHindi: 'राजविद्या राजगुह्य योग', verseCount: 34 },
  { number: 10, titleSanskrit: 'विभूतियोग', titleEnglish: 'The Yoga of Divine Manifestations', titleHindi: 'विभूति योग', verseCount: 42 },
  { number: 11, titleSanskrit: 'विश्वरूपदर्शनयोग', titleEnglish: 'The Yoga of the Vision of the Universal Form', titleHindi: 'विश्वरूप दर्शन योग', verseCount: 55 },
  { number: 12, titleSanskrit: 'भक्तियोग', titleEnglish: 'The Yoga of Devotion', titleHindi: 'भक्ति योग', verseCount: 20 },
  { number: 13, titleSanskrit: 'क्षेत्रक्षेत्रज्ञविभागयोग', titleEnglish: 'The Yoga of the Field and Its Knower', titleHindi: 'क्षेत्र क्षेत्रज्ञ विभाग योग', verseCount: 35 },
  { number: 14, titleSanskrit: 'गुणत्रयविभागयोग', titleEnglish: 'The Yoga of the Three Gunas', titleHindi: 'गुणत्रय विभाग योग', verseCount: 27 },
  { number: 15, titleSanskrit: 'पुरुषोत्तमयोग', titleEnglish: 'The Yoga of the Supreme Person', titleHindi: 'पुरुषोत्तम योग', verseCount: 20 },
  { number: 16, titleSanskrit: 'दैवासुरसंपद्विभागयोग', titleEnglish: 'The Yoga of the Divine and Demonic Natures', titleHindi: 'दैवासुर संपद् विभाग योग', verseCount: 24 },
  { number: 17, titleSanskrit: 'श्रद्धात्रयविभागयोग', titleEnglish: 'The Yoga of the Three Types of Faith', titleHindi: 'श्रद्धात्रय विभाग योग', verseCount: 28 },
  { number: 18, titleSanskrit: 'मोक्षसंन्यासयोग', titleEnglish: 'The Yoga of Liberation through Renunciation', titleHindi: 'मोक्ष संन्यास योग', verseCount: 78 },
];

const activityTypes = [
  { type: 'watch', title: 'Watch Verse Explanations', description: 'Watch detailed video explanations for each verse with Sanskrit recitation and English translation.' },
  { type: 'experiments', title: 'Activities/Experiments', description: 'Try practical exercises and experiments to apply the chapter\'s teachings in your daily life.' },
  { type: 'read', title: 'Read All Verses', description: 'Read all verses of this chapter with transliteration and translation.' },
  { type: 'listen', title: 'Listen to Audio', description: 'Listen to Sanskrit recitation of all verses with soothing background music.' },
  { type: 'quiz', title: 'Take Chapter Quiz', description: 'Test your understanding with an interactive quiz covering key concepts.' },
  { type: 'reflection', title: 'Write Reflection', description: 'Reflect on the teachings and write your personal insights and learnings.' },
  { type: 'discussion', title: 'Join Discussion', description: 'Engage with the community and discuss interpretations and applications.' },
];

// Sample verse activities for first 3 chapters
const verseActivitiesTemplates = [
  {
    type: 'experiment',
    title: 'Practice Detachment',
    description: 'Apply the teaching of non-attachment by consciously letting go of expectations in a specific situation today.',
    instructions: [
      { step: 1, description: 'Choose a task or interaction where you typically have strong expectations.' },
      { step: 2, description: 'Before starting, consciously acknowledge your attachment to specific outcomes.' },
      { step: 3, description: 'Perform the action with full effort but without fixating on results.' },
      { step: 4, description: 'Observe your mental state before, during, and after the activity.' },
      { step: 5, description: 'Journal about how detachment affected your experience and inner peace.' },
    ],
    duration: '30 minutes',
    difficulty: 'intermediate',
    benefits: ['Reduced anxiety about outcomes', 'Greater inner peace', 'Improved focus on the present'],
  },
  {
    type: 'meditation',
    title: 'Equanimity Meditation',
    description: 'A guided meditation to cultivate balance of mind in success and failure.',
    instructions: [
      { step: 1, description: 'Sit comfortably in a quiet space with your spine straight.' },
      { step: 2, description: 'Take 5 deep breaths, inhaling through the nose and exhaling through the mouth.' },
      { step: 3, description: 'Recall a recent success. Notice the feelings that arise without attachment.' },
      { step: 4, description: 'Now recall a recent setback. Observe the emotions with the same detachment.' },
      { step: 5, description: 'Repeat the affirmation: "I am neither my successes nor my failures. I am the unchanging witness."' },
      { step: 6, description: 'Sit in silence for 5 minutes, observing your breath and mental state.' },
    ],
    duration: '15 minutes',
    difficulty: 'beginner',
    benefits: ['Mental equilibrium', 'Emotional resilience', 'Reduced stress', 'Greater self-awareness'],
  },
  {
    type: 'reflection',
    title: 'Dharma Reflection',
    description: 'Reflect deeply on your personal dharma (duty) and how it aligns with your current actions.',
    instructions: [
      { step: 1, description: 'Find a quiet space and open your journal or notes app.' },
      { step: 2, description: 'Write down what you consider your core responsibilities in life.' },
      { step: 3, description: 'Identify areas where you might be avoiding your duties or following others\' paths.' },
      { step: 4, description: 'Consider: "Am I living authentically according to my nature, or am I imitating others?"' },
      { step: 5, description: 'List 3 specific actions you can take this week to align better with your dharma.' },
    ],
    duration: '20 minutes',
    difficulty: 'beginner',
    benefits: ['Clarity of purpose', 'Authentic self-expression', 'Reduced inner conflict', 'Better decision-making'],
  },
  {
    type: 'practice',
    title: 'Karma Yoga in Action',
    description: 'Practice selfless service by performing an action without expecting anything in return.',
    instructions: [
      { step: 1, description: 'Identify someone who could use help - a family member, colleague, or stranger.' },
      { step: 2, description: 'Perform a helpful action without announcing it or expecting recognition.' },
      { step: 3, description: 'While doing the service, focus entirely on the action, not the outcome.' },
      { step: 4, description: 'Afterwards, resist the urge to tell others or seek appreciation.' },
      { step: 5, description: 'Reflect on how it felt to give without attachment to results.' },
    ],
    duration: '45 minutes',
    difficulty: 'intermediate',
    benefits: ['Reduced ego', 'Greater compassion', 'Joy in giving', 'Freedom from validation-seeking'],
  },
  {
    type: 'journaling',
    title: 'Witnessing Your Mind',
    description: 'Use journaling to practice witnessing your thoughts and emotions without identification.',
    instructions: [
      { step: 1, description: 'Set a timer for 10 minutes and begin writing stream-of-consciousness style.' },
      { step: 2, description: 'Write whatever thoughts, feelings, and sensations arise without censoring.' },
      { step: 3, description: 'After writing, read through your entries as an observer, not as the author.' },
      { step: 4, description: 'Notice patterns, repeated thoughts, and emotional themes with curiosity, not judgment.' },
      { step: 5, description: 'Write a brief reflection: "I am not these thoughts. I am the awareness observing them."' },
    ],
    duration: '25 minutes',
    difficulty: 'beginner',
    benefits: ['Self-awareness', 'Emotional regulation', 'Mental clarity', 'Reduced identification with thoughts'],
  },
  {
    type: 'daily_challenge',
    title: 'Mindful Action Challenge',
    description: 'Spend the entire day performing all actions with full awareness and without rushing.',
    instructions: [
      { step: 1, description: 'Set an intention in the morning to move through the day with deliberate awareness.' },
      { step: 2, description: 'Before each task, pause for 3 breaths to center yourself.' },
      { step: 3, description: 'Perform each action - eating, walking, working - with complete presence.' },
      { step: 4, description: 'When you catch yourself rushing or acting mechanically, pause and reset.' },
      { step: 5, description: 'In the evening, journal about moments of presence vs. moments of autopilot.' },
    ],
    duration: 'Full day',
    difficulty: 'advanced',
    benefits: ['Enhanced presence', 'Reduced stress', 'Greater appreciation of life', 'Improved concentration'],
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/geeta-book');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Chapter.deleteMany({});
    await Activity.deleteMany({});
    await Verse.deleteMany({});
    await VerseActivity.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Seed Chapters
    for (const chapterData of chapters) {
      await Chapter.create({
        ...chapterData,
        description: 'This chapter explores the profound teachings of the Bhagavad Geeta, providing timeless wisdom for modern life. Learn about dharma, karma, and the path to spiritual enlightenment.',
        imageUrl: `https://picsum.photos/seed/chapter${chapterData.number}/400/300`,
        keyThemes: ['Wisdom', 'Action', 'Devotion', 'Knowledge'],
        totalActivities: 7,
      });
    }
    console.log('📚 Seeded 18 chapters');

    // Seed Activities for each chapter
    for (const chapter of chapters) {
      for (const activityType of activityTypes) {
        await Activity.create({
          chapterId: chapter.number.toString(),
          ...activityType,
          iconUrl: `${activityType.type}_icon`,
        });
      }
    }
    console.log('🎯 Seeded activities for all chapters');

    // Seed verses for all chapters (10 verses per chapter as sample)
    const sampleVersesData = [
      {
        sanskrit: 'धृतराष्ट्र उवाच | धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः | मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ||',
        transliteration: 'dhṛitarāśhtra uvācha\ndharma-kṣhetre kuru-kṣhetre samavetā yuyutsavaḥ\nmāmakāḥ pāṇḍavāśhchaiva kimakurvata sañjaya',
        english: 'Dhritarashtra said: O Sanjay, after gathering on the holy field of Kurukshetra, what did my sons and the sons of Pandu do, being desirous to fight?',
        hindi: 'धृतराष्ट्र ने कहा: हे संजय, धर्मभूमि कुरुक्षेत्र में एकत्रित हुए, युद्ध के इच्छुक मेरे और पाण्डु के पुत्रों ने क्या किया?',
        explanation: 'This opening verse sets the stage for the entire Bhagavad Geeta. King Dhritarashtra, blind from birth, asks his charioteer Sanjay to describe what happened on the battlefield.',
      },
      {
        sanskrit: 'युक्ताहारविहारस्य युक्तचेष्टस्य कर्मसु | युक्तस्वप्नावबोधस्य योगो भवति दुःखहा ||',
        transliteration: 'yuktāhāra-vihārasya yukta-cheṣhṭasya karmasu\nyukta-svapnāvabodhasya yogo bhavati duḥkha-hā',
        english: 'Those who are temperate in eating and recreation, balanced in work, and regulated in sleep, can mitigate all sorrows by practicing Yoga.',
        hindi: 'जो व्यक्ति खाने-पीने, विहार करने, कर्म करने तथा सोने-जागने में संयम रखते हैं, उनका योग दुःखों का नाश करने वाला होता है।',
        explanation: 'This verse emphasizes the importance of balance and moderation in all aspects of life. Krishna teaches that yoga is not just about meditation, but about maintaining equilibrium in daily activities.',
      },
      {
        sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन | मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ||',
        transliteration: 'karmaṇy-evādhikāras te mā phaleṣhu kadāchana\nmā karma-phala-hetur bhūr mā te saṅgo \'stvakarmaṇi',
        english: 'You have a right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of the results, nor be attached to not doing your duty.',
        hindi: 'तुम्हारा कर्म करने में ही अधिकार है, फलों में कभी नहीं। तुम न कर्मफल का हेतु बनो और न तुम्हारी कर्म न करने में आसक्ति हो।',
        explanation: 'This is one of the most famous verses of the Geeta, teaching the principle of Nishkama Karma - action without attachment to results. It guides us to focus on our efforts rather than outcomes.',
      },
      {
        sanskrit: 'योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय | सिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते ||',
        transliteration: 'yoga-sthaḥ kuru karmāṇi saṅgaṁ tyaktvā dhanañjaya\nsiddhy-asiddhyoḥ samo bhūtvā samatvaṁ yoga uchyate',
        english: 'Perform your duty equipoised, O Arjuna, abandoning all attachment to success or failure. Such equanimity is called Yoga.',
        hindi: 'हे अर्जुन! आसक्ति को त्यागकर, सिद्धि और असिद्धि में समान बुद्धि वाले होकर योग में स्थित हुआ कर्तव्य कर्मों को कर; समत्व ही योग कहलाता है।',
        explanation: 'Krishna defines yoga as equanimity - maintaining balance of mind in success and failure. This mental equilibrium allows us to perform our duties without being affected by outcomes.',
      },
      {
        sanskrit: 'बुद्धियुक्तो जहातीह उभे सुकृतदुष्कृते | तस्माद्योगाय युज्यस्व योगः कर्मसु कौशलम् ||',
        transliteration: 'buddhi-yukto jahātīha ubhe sukṛita-duṣhkṛite\ntasmād yogāya yujyasva yogaḥ karmasu kauśhalam',
        english: 'A person engaged in devotional service rids oneself of both good and bad actions even in this life. Therefore strive for yoga, which is the art of all work.',
        hindi: 'बुद्धियुक्त पुरुष पुण्य और पाप दोनों को इसी जीवन में त्याग देता है। इसलिए तू योग में लग जा; योग ही कर्मों में कुशलता है।',
        explanation: 'This verse teaches that through yoga of action, one transcends the duality of good and bad karma. Yoga is described as skill in action - performing duties with wisdom and balance.',
      },
      {
        sanskrit: 'श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात् | स्वधर्मे निधनं श्रेयः परधर्मो भयावहः ||',
        transliteration: 'śhreyān swa-dharmo viguṇaḥ para-dharmāt sv-anuṣhṭhitāt\nswa-dharme nidhanaṁ śhreyaḥ para-dharmo bhayāvahaḥ',
        english: 'It is far better to perform one\'s natural prescribed duty, though tinged with faults, than to perform another\'s prescribed duty, though perfectly. In fact, it is preferable to die in the discharge of one\'s duty, than to follow the path of another, which is fraught with danger.',
        hindi: 'अच्छी तरह आचरण किए हुए दूसरे के धर्म से गुणरहित भी अपना धर्म अति उत्तम है। अपने धर्म में तो मरना भी कल्याणकारक है और दूसरे का धर्म भय को देने वाला है।',
        explanation: 'This verse emphasizes following one\'s own path (swadharma) rather than imitating others. Each person has a unique role and duty based on their nature and circumstances.',
      },
      {
        sanskrit: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत | अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ||',
        transliteration: 'yadā yadā hi dharmasya glānir bhavati bhārata\nabhyutthānam adharmasya tadātmānaṁ sṛijāmyaham',
        english: 'Whenever there is a decline in righteousness and an increase in unrighteousness, O Arjun, at that time I manifest Myself on earth.',
        hindi: 'हे भारत! जब-जब धर्म की हानि और अधर्म की वृद्धि होती है, तब-तब मैं अपने रूप को रचता हूं अर्थात साकार रूप से लोगों के सम्मुख प्रकट होता हूं।',
        explanation: 'In this famous verse, Krishna explains the divine purpose of His incarnations - to restore dharma when righteousness declines and evil prevails.',
      },
      {
        sanskrit: 'परित्राणाय साधूनां विनाशाय च दुष्कृताम् | धर्मसंस्थापनार्थाय सम्भवामि युगे युगे ||',
        transliteration: 'paritrāṇāya sādhūnāṁ vināśhāya cha duṣhkṛitām\ndharma-sansthāpanārthāya sambhavāmi yuge yuge',
        english: 'To protect the righteous, to annihilate the wicked, and to reestablish the principles of dharma I appear on this earth, age after age.',
        hindi: 'साधु पुरुषों का परित्राण करने के लिए, पाप कर्म करने वालों का विनाश करने के लिए और धर्म की अच्छी तरह से स्थापना करने के लिए मैं युग-युग में प्रकट हुआ करता हूं।',
        explanation: 'Krishna continues describing the purpose of divine incarnation - protecting the good, destroying evil, and establishing righteousness in every age.',
      },
      {
        sanskrit: 'चातुर्वर्ण्यं मया सृष्टं गुणकर्मविभागशः | तस्य कर्तारमपि मां विद्ध्यकर्तारमव्ययम् ||',
        transliteration: 'chātur-varṇyaṁ mayā sṛiṣhṭaṁ guṇa-karma-vibhāgaśhaḥ\ntasya kartāram api māṁ viddhyakartāram avyayam',
        english: 'The four categories of occupations were created by Me according to people\'s qualities and activities. Although I am the creator of this system, know Me to be the non-doer and eternal.',
        hindi: 'गुण और कर्मों के विभाग से चारों वर्ण मेरे द्वारा रचे गए हैं। उस सृष्टि-रचना का कर्ता होने पर भी मुझ अविनाशी को तुम अकर्ता ही जानो।',
        explanation: 'This verse explains the system of varna (social divisions) based on one\'s inherent qualities and natural inclinations, not birth. Krishna clarifies He is beyond this system.',
      },
      {
        sanskrit: 'न हि ज्ञानेन सदृशं पवित्रमिह विद्यते | तत्स्वयं योगसंसिद्धः कालेनात्मनि विन्दति ||',
        transliteration: 'na hi jñānena sadṛiśhaṁ pavitramiha vidyate\ntat svayaṁ yoga-sansiddhaḥ kālenātmani vindati',
        english: 'In this world, there is nothing as purifying as divine knowledge. One who has attained purity of mind through prolonged practice of Yoga, receives such knowledge within the heart, in due course of time.',
        hindi: 'निःसन्देह इस संसार में ज्ञान के समान पवित्र करने वाला दूसरा कुछ भी नहीं है। उस ज्ञान को योग में परिपक्व साधक कालक्रम से अपने आप में ही प्राप्त हो जाता है।',
        explanation: 'This verse extols the supremacy of spiritual knowledge as the greatest purifier. Such knowledge is naturally realized by a sincere practitioner of yoga over time.',
      },
    ];

    let totalVerses = 0;
    for (const chapter of chapters) {
      const verseCount = Math.min(chapter.verseCount, 10); // Seed 10 verses per chapter
      
      for (let i = 0; i < verseCount; i++) {
        const sampleVerse = sampleVersesData[i % sampleVersesData.length];
        
        await Verse.create({
          chapterId: chapter.number.toString(),
          verseNumber: i + 1,
          textSanskrit: sampleVerse.sanskrit + ` ||${i + 1}||`,
          textTransliteration: sampleVerse.transliteration,
          translationEnglish: sampleVerse.english,
          translationHindi: sampleVerse.hindi,
          explanation: sampleVerse.explanation,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          images: [
            `https://picsum.photos/seed/verse${chapter.number}-${i + 1}-1/400/300`,
            `https://picsum.photos/seed/verse${chapter.number}-${i + 1}-2/400/300`,
          ],
        });
        totalVerses++;
      }
    }
    
    console.log(`📖 Seeded ${totalVerses} verses across all chapters`);

    // Seed verse activities (2-3 activities per verse for first 3 chapters)
    let totalVerseActivities = 0;
    const chaptersToSeed = chapters.slice(0, 3); // Seed activities for first 3 chapters
    
    for (const chapter of chaptersToSeed) {
      const verseCount = Math.min(chapter.verseCount, 10);
      
      for (let verseNum = 1; verseNum <= verseCount; verseNum++) {
        // Create 2-3 activities per verse
        const activityCount = Math.min(2 + (verseNum % 2), 3); // Alternating 2-3 activities
        
        for (let order = 0; order < activityCount; order++) {
          const template = verseActivitiesTemplates[order % verseActivitiesTemplates.length];
          
          await VerseActivity.create({
            chapterId: chapter.number.toString(),
            verseNumber: verseNum,
            title: `${template.title} - Verse ${verseNum}`,
            description: template.description,
            type: template.type,
            instructions: template.instructions,
            duration: template.duration,
            difficulty: template.difficulty,
            benefits: template.benefits,
            iconUrl: `${template.type}_icon`,
            order: order,
          });
          totalVerseActivities++;
        }
      }
    }
    
    console.log(`🧪 Seeded ${totalVerseActivities} verse activities for first 3 chapters`);

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
