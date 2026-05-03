export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleUrdu: string;
  excerpt: string;
  excerptUrdu: string;
  content: string;
  contentUrdu: string;
  category: string;
  icon: string;
  readTime: string;
  date: string;
  image: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'how-to-take-tablets-correctly',
    title: 'How to Take Tablets & Capsules Correctly',
    titleUrdu: 'گولیاں اور کیپسول صحیح طریقے سے کیسے لیں',
    excerpt: 'Learn the proper way to take oral medications for maximum effectiveness and safety.',
    excerptUrdu: 'زیادہ سے زیادہ تاثیر اور حفاظت کے لیے منہ سے لی جانے والی دوائیں لینے کا صحیح طریقہ سیکھیں۔',
    category: 'Medicine Guide',
    icon: 'pill',
    readTime: '5 min',
    date: '2026-03-15',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80',
    tags: ['tablets', 'capsules', 'oral medication'],
    content: `## How to Take Tablets & Capsules Correctly

### 1. Read the Label Carefully
Always read the prescription label or medication guide before taking any medicine. Check the dosage, frequency, and whether to take with food or on an empty stomach.

### 2. Take with Water
Swallow tablets and capsules with a full glass of water (at least 200ml). Avoid using juice, milk, or carbonated drinks unless specifically instructed.

### 3. Don't Crush or Break Unless Advised
Some tablets are designed for slow release. Breaking or crushing them can release too much medicine at once, which can be dangerous.

### 4. Timing Matters
- **Before meals**: Take 30 minutes before eating
- **After meals**: Take immediately after or within 30 minutes of eating
- **With meals**: Take while eating

### 5. Never Double Dose
If you miss a dose, take it as soon as you remember. If it's almost time for the next dose, skip the missed one. Never take two doses at once.

### 6. Storage
- Keep medicines in a cool, dry place
- Away from direct sunlight
- Out of reach of children
- Check expiry dates regularly

### 7. Common Mistakes to Avoid
- Don't take medicine with hot drinks
- Don't lie down immediately after taking tablets
- Don't share prescription medicine with others
- Complete the full course of antibiotics`,
    contentUrdu: `## گولیاں اور کیپسول صحیح طریقے سے کیسے لیں

### ١. لیبل احتیاط سے پڑھیں
کوئی بھی دوائی لینے سے پہلے ہمیشہ نسخے کا لیبل یا دوائی کی گائیڈ پڑھیں۔ خوراک، تعدد، اور یہ کہ کھانے کے ساتھ لینی ہے یا خالی پیٹ، یہ سب چیک کریں۔

### ٢. پانی کے ساتھ لیں
گولیاں اور کیپسول ایک پورا گلاس پانی (کم از کم 200ml) کے ساتھ نگلیں۔ جوس، دودھ، یا کاربونیٹڈ مشروبات سے بچیں جب تک خاص طور پر ہدایت نہ دی جائے۔

### ٣. بغیر ہدایت کے نہ توڑیں
کچھ گولیاں آہستہ آہستہ اثر کرنے کے لیے بنائی جاتی ہیں۔ انہیں توڑنے یا کچلنے سے بہت زیادہ دوائی ایک ساتھ نکل سکتی ہے جو خطرناک ہو سکتی ہے۔

### ٤. وقت اہم ہے
- **کھانے سے پہلے**: کھانے سے 30 منٹ پہلے لیں
- **کھانے کے بعد**: کھانے کے فوراً بعد یا 30 منٹ کے اندر لیں
- **کھانے کے ساتھ**: کھاتے وقت لیں

### ٥. کبھی دوگنی خوراک نہ لیں
اگر آپ کوئی خوراک بھول جائیں تو جیسے ہی یاد آئے لے لیں۔ اگر اگلی خوراک کا وقت قریب ہو تو چھوڑ دیں۔ کبھی ایک ساتھ دو خوراکیں نہ لیں۔

### ٦. ذخیرہ
- دوائیں ٹھنڈی، خشک جگہ پر رکھیں
- براہ راست سورج کی روشنی سے دور
- بچوں کی پہنچ سے دور
- باقاعدگی سے ایکسپائری ڈیٹ چیک کریں`,
  },
  {
    id: '2',
    slug: 'antibiotic-usage-guide',
    title: 'Complete Guide to Antibiotic Usage',
    titleUrdu: 'اینٹی بائیوٹک استعمال کی مکمل گائیڈ',
    excerpt: 'Why completing your antibiotic course matters and how misuse creates resistant bacteria.',
    excerptUrdu: 'اینٹی بائیوٹک کا مکمل کورس کیوں ضروری ہے اور غلط استعمال سے مزاحم بیکٹیریا کیسے بنتے ہیں۔',
    category: 'Health Education',
    icon: 'shield',
    readTime: '7 min',
    date: '2026-03-10',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800&q=80',
    tags: ['antibiotics', 'resistance', 'health'],
    content: `## Complete Guide to Antibiotic Usage

### What Are Antibiotics?
Antibiotics are medicines that fight bacterial infections. They work by killing bacteria or stopping them from multiplying. They do NOT work against viruses like cold or flu.

### The Golden Rules of Antibiotics

#### 1. Complete the Full Course
Even if you feel better after 2-3 days, always complete the prescribed course. Stopping early can leave some bacteria alive, which may become resistant.

#### 2. Take at Regular Intervals
If prescribed 3 times a day, take every 8 hours. If twice a day, take every 12 hours. This maintains consistent drug levels in your blood.

#### 3. Never Self-Prescribe
Only take antibiotics when prescribed by a doctor. Using leftover antibiotics or someone else's prescription can be dangerous.

#### 4. Common Side Effects
- Stomach upset or diarrhea
- Nausea
- Yeast infections
- Skin rashes (allergic reaction — see doctor immediately)

### Antibiotic Resistance Crisis
When antibiotics are misused, bacteria evolve to resist them. This is a global health crisis. In Pakistan, antibiotic resistance is growing rapidly due to:
- Over-the-counter sales without prescription
- Incomplete courses
- Using antibiotics for viral infections`,
    contentUrdu: `## اینٹی بائیوٹک استعمال کی مکمل گائیڈ

### اینٹی بائیوٹک کیا ہیں؟
اینٹی بائیوٹک ایسی دوائیں ہیں جو بیکٹیریل انفیکشن سے لڑتی ہیں۔ یہ بیکٹیریا کو مار کر یا ان کی افزائش روک کر کام کرتی ہیں۔ یہ وائرس جیسے زکام یا فلو کے خلاف کام نہیں کرتیں۔

### اینٹی بائیوٹک کے سنہری اصول

#### ١. مکمل کورس لیں
اگر 2-3 دن بعد بہتر محسوس ہو تو بھی ہمیشہ تجویز کردہ کورس مکمل کریں۔ جلدی بند کرنے سے کچھ بیکٹیریا زندہ رہ سکتے ہیں جو مزاحم بن سکتے ہیں۔

#### ٢. باقاعدہ وقفوں پر لیں
اگر دن میں 3 بار تجویز کی گئی ہو تو ہر 8 گھنٹے بعد لیں۔ اگر دن میں 2 بار تو ہر 12 گھنٹے بعد۔

#### ٣. خود سے تجویز نہ کریں
اینٹی بائیوٹک صرف ڈاکٹر کی تجویز پر لیں۔ بچی ہوئی یا کسی اور کی دوائی استعمال نہ کریں۔

### اینٹی بائیوٹک مزاحمت کا بحران
جب اینٹی بائیوٹک کا غلط استعمال ہوتا ہے تو بیکٹیریا ان کے خلاف مزاحمت پیدا کر لیتے ہیں۔ پاکستان میں اینٹی بائیوٹک مزاحمت تیزی سے بڑھ رہی ہے۔`,
  },
  {
    id: '3',
    slug: 'first-aid-essentials-at-home',
    title: 'First Aid Essentials Every Home Should Have',
    titleUrdu: 'ہر گھر میں ضروری فرسٹ ایڈ کی چیزیں',
    excerpt: 'A complete checklist of first aid supplies every Pakistani household needs.',
    excerptUrdu: 'ہر پاکستانی گھر کے لیے فرسٹ ایڈ سامان کی مکمل چیک لسٹ۔',
    category: 'First Aid',
    icon: 'heart',
    readTime: '6 min',
    date: '2026-03-05',
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=800&q=80',
    tags: ['first aid', 'home safety', 'emergency'],
    content: `## First Aid Essentials Every Home Should Have

### The Basic First Aid Kit

#### Wound Care
- **Bandages** (various sizes): For covering cuts and scrapes
- **Antiseptic solution** (Dettol/Savlon): Clean wounds before dressing
- **Cotton wool & gauze pads**: For cleaning and padding
- **Medical tape**: To secure bandages
- **Scissors**: For cutting tape and bandages

#### Pain & Fever
- **Paracetamol (Panadol)**: For fever and mild pain (adults & children formulations)
- **Ibuprofen (Brufen)**: For pain, inflammation, and fever
- **ORS packets**: For dehydration from diarrhea or vomiting

#### Burns & Skin
- **Burnol/Silver Sulfadiazine cream**: For minor burns
- **Calamine lotion**: For insect bites, rashes, itching
- **Antibiotic ointment (Polyfax)**: For infected wounds

#### Emergency Items
- **Thermometer**: Digital preferred
- **Tweezers**: For removing splinters
- **Torch/flashlight**: For examining injuries
- **Emergency contact numbers list**

### When to Go to Hospital
- Deep cuts that won't stop bleeding
- Burns larger than your palm
- Suspected broken bones
- Difficulty breathing
- Allergic reactions with swelling
- High fever (above 103°F/39.4°C) not responding to medicine`,
    contentUrdu: `## ہر گھر میں ضروری فرسٹ ایڈ کی چیزیں

### بنیادی فرسٹ ایڈ کٹ

#### زخم کی دیکھ بھال
- **پٹیاں** (مختلف سائز): کٹوں اور خراشوں کو ڈھانپنے کے لیے
- **اینٹی سیپٹک محلول** (ڈیٹول/سیولون): پٹی باندھنے سے پہلے زخم صاف کریں
- **روئی اور گاز پیڈ**: صفائی اور پیڈنگ کے لیے
- **طبی ٹیپ**: پٹیاں محفوظ کرنے کے لیے

#### درد اور بخار
- **پیراسیٹامول (پینڈول)**: بخار اور ہلکے درد کے لیے
- **آئی بیوپروفین (بروفین)**: درد، سوزش اور بخار کے لیے
- **او آر ایس پیکٹ**: اسہال یا الٹی سے پانی کی کمی کے لیے

#### ہسپتال کب جائیں
- گہرے کٹ جن سے خون بند نہ ہو
- ہتھیلی سے بڑے جلنے کے نشان
- ہڈی ٹوٹنے کا شبہ
- سانس لینے میں دشواری
- تیز بخار (103°F سے اوپر) جو دوائی سے نہ اترے`,
  },
  {
    id: '4',
    slug: 'syrup-dosage-guide-children',
    title: 'Syrup Dosage Guide for Children',
    titleUrdu: 'بچوں کے لیے شربت کی خوراک کی رہنمائی',
    excerpt: 'Safe dosage guidelines for common children\'s syrups based on age and weight.',
    excerptUrdu: 'عمر اور وزن کے مطابق بچوں کے عام شربتوں کی محفوظ خوراک کی رہنمائی۔',
    category: 'Children Health',
    icon: 'baby',
    readTime: '6 min',
    date: '2026-02-28',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80',
    tags: ['syrups', 'children', 'dosage'],
    content: `## Syrup Dosage Guide for Children

### Important: Always Consult a Doctor
This guide is for general awareness only. Always follow your doctor's prescribed dosage.

### General Dosage by Age (Paracetamol Syrup)
| Age | Weight | Dose | Frequency |
|-----|--------|------|-----------|
| 3-12 months | 5-8 kg | 2.5 ml | Every 6 hours |
| 1-3 years | 8-14 kg | 5 ml | Every 6 hours |
| 3-6 years | 14-20 kg | 7.5 ml | Every 6 hours |
| 6-12 years | 20-40 kg | 10 ml | Every 6 hours |

### How to Give Medicine to Children
1. **Use the measuring device** provided with the syrup (cup, dropper, or syringe)
2. **Never use kitchen spoons** — they give inaccurate doses
3. **Shake the bottle** well before each use
4. **Don't mix with food** unless doctor says so
5. **Store properly** — some syrups need refrigeration after opening

### Tips for Fussy Children
- Use a medicine dropper aimed at the inside cheek
- For babies, give medicine before feeding
- Praise the child after taking medicine
- Never call medicine "candy"

### When to Seek Emergency Help
- Accidental overdose — call poison control
- Allergic reaction (rash, swelling, difficulty breathing)
- Vomiting repeatedly after taking medicine
- Child becomes drowsy or unresponsive`,
    contentUrdu: `## بچوں کے لیے شربت کی خوراک کی رہنمائی

### اہم: ہمیشہ ڈاکٹر سے مشورہ کریں
یہ گائیڈ صرف عام آگاہی کے لیے ہے۔ ہمیشہ اپنے ڈاکٹر کی تجویز کردہ خوراک پر عمل کریں۔

### بچوں کو دوائی دینے کا طریقہ
١. شربت کے ساتھ دیا گیا پیمائشی آلہ (کپ، ڈراپر، یا سرنج) استعمال کریں
٢. کبھی کچن کے چمچ استعمال نہ کریں — وہ غلط خوراک دیتے ہیں
٣. ہر استعمال سے پہلے بوتل اچھی طرح ہلائیں
٤. جب تک ڈاکٹر نہ کہے کھانے میں نہ ملائیں

### ضدی بچوں کے لیے تجاویز
- دوائی کا ڈراپر گال کے اندر کی طرف رکھیں
- چھوٹے بچوں کو دودھ پلانے سے پہلے دوائی دیں
- دوائی لینے کے بعد بچے کی تعریف کریں

### ایمرجنسی میں مدد کب لیں
- حادثاتی زیادہ خوراک
- الرجک ردعمل (دھبے، سوجن، سانس میں دشواری)
- بار بار الٹی`,
  },
  {
    id: '5',
    slug: 'injection-safety-guide',
    title: 'Injection Safety: What You Need to Know',
    titleUrdu: 'انجکشن کی حفاظت: جو آپ کو جاننا ضروری ہے',
    excerpt: 'Understanding injection types, safe administration, and when injections are necessary.',
    excerptUrdu: 'انجکشن کی اقسام، محفوظ طریقے سے لگانا، اور کب انجکشن ضروری ہیں۔',
    category: 'Safety Guide',
    icon: 'syringe',
    readTime: '5 min',
    date: '2026-02-20',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=80',
    tags: ['injections', 'safety', 'healthcare'],
    content: `## Injection Safety: What You Need to Know

### Types of Injections
1. **Intramuscular (IM)**: Into the muscle (thigh, upper arm, buttock)
2. **Subcutaneous (SC)**: Under the skin (insulin, blood thinners)
3. **Intravenous (IV)**: Directly into a vein (hospital setting only)

### Why Are Injections Used?
- When medicine can't be taken orally (vomiting)
- When fast action is needed (emergencies)
- When the medicine is destroyed by stomach acid
- For vaccines and immunizations

### Safety Rules
- **Only trained professionals** should administer injections
- **Always use new, sterile syringes** — never reuse
- **Proper disposal** of used syringes in sharps containers
- **Check for allergies** before any injection
- **Observe for 15-30 minutes** after injection for allergic reactions

### Common Myths Debunked
❌ "Injections work faster than tablets for common flu" — Usually not necessary
❌ "Glucose drip gives energy" — Only needed for medical conditions
❌ "More injections = better treatment" — Oral medicines are equally effective for most conditions`,
    contentUrdu: `## انجکشن کی حفاظت: جو آپ کو جاننا ضروری ہے

### انجکشن کی اقسام
١. **انٹرامسکولر (IM)**: پٹھے میں (ران، بازو، کولہا)
٢. **سب کیوٹینیئس (SC)**: جلد کے نیچے (انسولین)
٣. **انٹراوینس (IV)**: براہ راست رگ میں (صرف ہسپتال میں)

### حفاظتی اصول
- صرف تربیت یافتہ پیشہ ور ہی انجکشن لگائیں
- ہمیشہ نئی، جراثیم سے پاک سرنج استعمال کریں — کبھی دوبارہ استعمال نہ کریں
- استعمال شدہ سرنجوں کو مناسب طریقے سے ضائع کریں
- کسی بھی انجکشن سے پہلے الرجی چیک کریں

### عام غلط فہمیاں
❌ "عام فلو کے لیے انجکشن گولیوں سے تیز کام کرتے ہیں" — عموماً ضروری نہیں
❌ "گلوکوز ڈرپ توانائی دیتی ہے" — صرف طبی حالات کے لیے ضروری
❌ "زیادہ انجکشن = بہتر علاج" — زیادہ تر حالات کے لیے منہ سے لی جانے والی دوائیں اتنی ہی مؤثر ہیں`,
  },
  {
    id: '6',
    slug: 'ointment-cream-application-guide',
    title: 'How to Apply Ointments & Creams Properly',
    titleUrdu: 'مرہم اور کریم صحیح طریقے سے کیسے لگائیں',
    excerpt: 'Step-by-step guide to applying topical medicines for best results.',
    excerptUrdu: 'بہترین نتائج کے لیے بیرونی دوائیں لگانے کی مرحلہ وار رہنمائی۔',
    category: 'Medicine Guide',
    icon: 'droplets',
    readTime: '4 min',
    date: '2026-02-15',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    tags: ['ointments', 'creams', 'skin care'],
    content: `## How to Apply Ointments & Creams Properly

### Step-by-Step Application

1. **Wash your hands** thoroughly with soap and water
2. **Clean the affected area** gently with mild soap and pat dry
3. **Apply a thin layer** — more is not better
4. **Use fingertip units (FTU)** — the amount from fingertip to first crease
5. **Gently rub in** using circular motions
6. **Wash hands again** after application (unless treating hands)

### Fingertip Unit Guide
- Face & neck: 2.5 FTU
- One hand (front & back): 1 FTU
- One arm: 3 FTU
- One leg: 6 FTU
- Chest & abdomen: 7 FTU

### Important Tips
- Apply at the same time each day
- Don't cover with bandages unless told by doctor
- Wait 15-30 minutes between different creams
- Apply moisturizer first, then medicine (unless directed otherwise)
- Don't apply to broken skin or open wounds unless prescribed
- Keep tubes sealed — bacteria can contaminate opened ointments`,
    contentUrdu: `## مرہم اور کریم صحیح طریقے سے کیسے لگائیں

### مرحلہ وار طریقہ

١. اپنے ہاتھ صابن اور پانی سے اچھی طرح دھوئیں
٢. متاثرہ جگہ کو ہلکے صابن سے آہستہ سے صاف کریں اور خشک کریں
٣. پتلی تہہ لگائیں — زیادہ مقدار بہتر نہیں ہے
٤. انگلی کی نوک سے پہلی لکیر تک کی مقدار استعمال کریں
٥. گول حرکت سے آہستہ سے رگڑیں
٦. لگانے کے بعد دوبارہ ہاتھ دھوئیں

### اہم تجاویز
- ہر روز ایک ہی وقت پر لگائیں
- جب تک ڈاکٹر نہ کہے پٹی سے نہ ڈھانپیں
- مختلف کریموں کے درمیان 15-30 منٹ انتظار کریں
- پہلے موئسچرائزر لگائیں پھر دوائی`,
  },
  {
    id: '7',
    slug: 'medicine-storage-guide-pakistan',
    title: 'Medicine Storage in Pakistani Climate',
    titleUrdu: 'پاکستانی موسم میں دوائیوں کا ذخیرہ',
    excerpt: 'How to properly store medicines in hot and humid Pakistani weather to maintain effectiveness.',
    excerptUrdu: 'گرم اور مرطوب پاکستانی موسم میں دوائیوں کی تاثیر برقرار رکھنے کے لیے صحیح ذخیرہ کا طریقہ۔',
    category: 'Storage Tips',
    icon: 'thermometer',
    readTime: '4 min',
    date: '2026-02-10',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&q=80',
    tags: ['storage', 'climate', 'safety'],
    content: `## Medicine Storage in Pakistani Climate

### Why Storage Matters
Pakistan's hot summers (40°C+) and humid monsoon season can degrade medicines quickly. Improper storage can make medicines ineffective or even harmful.

### General Storage Rules

#### Room Temperature Medicines
- Store between 15-25°C
- In summer, keep in the coolest room
- Use air-conditioned rooms if possible
- Keep away from windows and direct sunlight

#### Refrigerated Medicines
- Insulin, some syrups, and eye drops need 2-8°C
- Don't freeze — freezing destroys many medicines
- Keep in the main compartment, not the door
- Use a thermometer to check fridge temperature

### Power Outage Tips (Load Shedding)
- Keep refrigerated medicines in insulated bags during outages
- Don't open the fridge unnecessarily
- Consider a small UPS or generator for medicine fridge
- Ice packs can maintain temperature for 4-6 hours

### Signs of Spoiled Medicine
- **Tablets**: Crumbling, color change, unusual smell
- **Syrups**: Separation, cloudiness, changed color
- **Ointments**: Dried out, changed texture, bad smell
- **Capsules**: Stuck together, swollen, discolored`,
    contentUrdu: `## پاکستانی موسم میں دوائیوں کا ذخیرہ

### ذخیرہ کیوں اہم ہے
پاکستان کی گرم گرمیاں (40°C+) اور مرطوب مانسون کا موسم دوائیوں کو تیزی سے خراب کر سکتا ہے۔

### عمومی ذخیرہ کے اصول

#### کمرے کے درجہ حرارت والی دوائیں
- 15-25°C کے درمیان رکھیں
- گرمیوں میں سب سے ٹھنڈے کمرے میں رکھیں
- ایئر کنڈیشنڈ کمرے استعمال کریں

#### فریج والی دوائیں
- انسولین، کچھ شربت، اور آنکھوں کے قطرے 2-8°C پر رکھیں
- منجمد نہ کریں

### لوڈ شیڈنگ کے دوران
- بجلی بند ہونے پر فریج والی دوائیں موصل بیگ میں رکھیں
- بغیر ضرورت فریج نہ کھولیں
- آئس پیک 4-6 گھنٹے تک درجہ حرارت برقرار رکھ سکتے ہیں`,
  },
  {
    id: '8',
    slug: 'diabetes-medicine-management',
    title: 'Managing Diabetes Medicines Effectively',
    titleUrdu: 'ذیابیطس کی دوائیوں کا مؤثر انتظام',
    excerpt: 'A comprehensive guide to managing insulin and oral diabetes medications.',
    excerptUrdu: 'انسولین اور منہ سے لی جانے والی ذیابیطس کی دوائیوں کے انتظام کی جامع رہنمائی۔',
    category: 'Chronic Disease',
    icon: 'activity',
    readTime: '8 min',
    date: '2026-02-05',
    image: 'https://images.unsplash.com/photo-1593491034932-844ab981ed7c?w=800&q=80',
    tags: ['diabetes', 'insulin', 'chronic disease'],
    content: `## Managing Diabetes Medicines Effectively

### Understanding Your Medicines

#### Oral Medications
- **Metformin (Glucophage)**: Take with meals to reduce stomach upset
- **Glimepiride/Glibenclamide**: Take 30 minutes before breakfast
- **Sitagliptin (Januvia)**: Can be taken with or without food

#### Insulin
- **Rapid-acting** (NovoRapid): 15 minutes before meals
- **Long-acting** (Lantus): Same time each day
- **Pre-mixed** (Mixtard): 30 minutes before meals

### Blood Sugar Monitoring
- Check fasting sugar every morning
- Keep a log book
- Normal ranges:
  - Fasting: 70-130 mg/dL
  - 2 hours after meal: Less than 180 mg/dL

### Lifestyle Tips
- Regular exercise (30 minutes walking daily)
- Low-sugar, high-fiber diet
- Regular foot checks
- Annual eye examinations
- Stay hydrated`,
    contentUrdu: `## ذیابیطس کی دوائیوں کا مؤثر انتظام

### اپنی دوائیں سمجھیں

#### منہ سے لی جانے والی دوائیں
- **میٹفارمن (گلوکوفیج)**: پیٹ کی خرابی کم کرنے کے لیے کھانے کے ساتھ لیں
- **گلیمیپرائیڈ**: ناشتے سے 30 منٹ پہلے لیں

#### انسولین
- **تیز اثر والی**: کھانے سے 15 منٹ پہلے
- **لمبے عرصے والی**: ہر روز ایک ہی وقت پر

### بلڈ شوگر کی نگرانی
- ہر صبح فاسٹنگ شوگر چیک کریں
- ریکارڈ رکھیں
- نارمل حد:
  - فاسٹنگ: 70-130 mg/dL
  - کھانے کے 2 گھنٹے بعد: 180 mg/dL سے کم`,
  },
  {
    id: '9',
    slug: 'dengue-prevention-pakistan',
    title: 'Dengue Prevention & Treatment Guide for Pakistan',
    titleUrdu: 'پاکستان میں ڈینگی کی روک تھام اور علاج کی رہنمائی',
    excerpt: 'Complete guide on preventing dengue fever and managing symptoms during monsoon season.',
    excerptUrdu: 'مانسون کے موسم میں ڈینگی بخار سے بچاؤ اور علامات کے انتظام کی مکمل رہنمائی۔',
    category: 'Seasonal Health',
    icon: 'shield',
    readTime: '7 min',
    date: '2026-04-01',
    image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&q=80',
    tags: ['dengue', 'mosquito', 'monsoon', 'prevention'],
    content: `## Dengue Prevention & Treatment Guide

### What is Dengue?
Dengue is a viral infection spread by the Aedes mosquito. In Pakistan, dengue season peaks during and after monsoon (July-November). Punjab, including Kasur and Lahore, is particularly affected.

### Prevention Methods

#### 1. Eliminate Breeding Sites
- Empty standing water from pots, tires, containers
- Change water in flower vases every 2 days
- Cover water storage tanks
- Clean roof gutters regularly
- Use mosquito larvicide in water tanks

#### 2. Personal Protection
- Use mosquito repellent (DEET-based)
- Wear long sleeves and pants, especially at dawn and dusk
- Use mosquito nets while sleeping
- Install window screens
- Use electric mosquito killers

#### 3. Community Action
- Report stagnant water to local authorities
- Participate in spray campaigns
- Educate neighbors about prevention

### Recognizing Dengue Symptoms
- **High fever** (104°F / 40°C)
- **Severe headache** behind the eyes
- **Joint and muscle pain** (breakbone fever)
- **Nausea and vomiting**
- **Skin rash** (appears 2-5 days after fever)
- **Bleeding** from nose or gums (severe cases)

### Treatment at Home (Mild Cases)
- **Paracetamol ONLY** for fever (NO aspirin, NO ibuprofen)
- Drink plenty of fluids (ORS, coconut water, fresh juices)
- Complete bed rest
- Monitor platelet count daily
- Check for warning signs

### When to Go to Hospital IMMEDIATELY
- Severe abdominal pain
- Persistent vomiting
- Bleeding from any site
- Platelet count below 50,000
- Extreme fatigue or restlessness
- Cold, clammy skin`,
    contentUrdu: `## ڈینگی کی روک تھام اور علاج

### ڈینگی کیا ہے؟
ڈینگی ایک وائرل انفیکشن ہے جو ایڈیز مچھر سے پھیلتا ہے۔ پاکستان میں ڈینگی کا موسم مانسون کے دوران اور بعد میں (جولائی-نومبر) عروج پر ہوتا ہے۔

### بچاؤ کے طریقے

#### ١. افزائش گاہوں کا خاتمہ
- گملوں، ٹائروں، برتنوں سے کھڑا پانی خالی کریں
- ہر 2 دن بعد پھولدانوں کا پانی بدلیں
- پانی کے ٹینک ڈھانپیں

#### ٢. ذاتی تحفظ
- مچھر بھگانے والی کریم استعمال کریں
- لمبی آستین اور پتلون پہنیں
- مچھردانی استعمال کریں

### علامات پہچانیں
- تیز بخار (104°F)
- شدید سر درد
- جوڑوں اور پٹھوں میں درد
- متلی اور الٹی

### گھر پر علاج
- بخار کے لیے صرف پیراسیٹامول (اسپرین ہرگز نہ لیں)
- زیادہ سے زیادہ مائعات پئیں
- مکمل آرام کریں
- روزانہ پلیٹلیٹ کاؤنٹ چیک کریں`,
  },
  {
    id: '10',
    slug: 'heatstroke-prevention-management',
    title: 'Heatstroke Prevention & Emergency Management',
    titleUrdu: 'لو لگنے سے بچاؤ اور ایمرجنسی انتظام',
    excerpt: 'Essential guide for surviving Pakistan\'s extreme summer heat and recognizing heatstroke symptoms.',
    excerptUrdu: 'پاکستان کی شدید گرمی سے بچاؤ اور لو لگنے کی علامات پہچاننے کی ضروری رہنمائی۔',
    category: 'Seasonal Health',
    icon: 'thermometer',
    readTime: '6 min',
    date: '2026-03-28',
    image: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80',
    tags: ['heatstroke', 'summer', 'emergency', 'dehydration'],
    content: `## Heatstroke Prevention & Emergency Management

### Understanding Heat-Related Illness
In Pakistan's summer, temperatures exceed 45°C in Punjab. Heat-related deaths are preventable with proper awareness.

### Types of Heat Illness

#### Heat Exhaustion (Less Severe)
- Heavy sweating
- Weakness and fatigue
- Dizziness and headache
- Nausea
- Cool, moist skin

#### Heatstroke (Medical Emergency!)
- Body temperature above 104°F (40°C)
- Confusion or unconsciousness
- Hot, DRY skin (no sweating)
- Rapid heartbeat
- Seizures

### Prevention Tips

#### Stay Hydrated
- Drink 3-4 liters of water daily in summer
- Use ORS if working outdoors
- Avoid tea, coffee, and sugary drinks during peak heat
- Eat water-rich fruits (watermelon, cucumber)

#### Avoid Heat Exposure
- Stay indoors between 11 AM - 4 PM
- Wear light-colored, loose cotton clothes
- Use umbrellas and hats when outside
- Never leave children in parked cars

#### Diet Tips
- Eat light meals (avoid heavy, oily food)
- Lassi, lemonade, and sattu are excellent
- Increase salt intake slightly
- Avoid street food during extreme heat

### Emergency First Aid for Heatstroke
1. Move person to shade immediately
2. Remove excess clothing
3. Cool with water — pour on head and body
4. Fan the person vigorously
5. Apply ice packs to neck, armpits, groin
6. Give small sips of cool water if conscious
7. Call emergency services (1122) immediately`,
    contentUrdu: `## لو لگنے سے بچاؤ اور ایمرجنسی انتظام

### گرمی سے متعلق بیماری کو سمجھیں
پاکستان کی گرمیوں میں پنجاب میں درجہ حرارت 45°C سے تجاوز کر جاتا ہے۔

### گرمی کی بیماری کی اقسام

#### ہیٹ ایگزاشن
- زیادہ پسینہ آنا
- کمزوری اور تھکاوٹ
- چکر آنا

#### ہیٹ اسٹروک (طبی ایمرجنسی!)
- جسم کا درجہ حرارت 104°F سے اوپر
- الجھن یا بے ہوشی
- گرم، خشک جلد (پسینہ نہیں آتا)

### بچاؤ کے طریقے
- روزانہ 3-4 لیٹر پانی پئیں
- صبح 11 سے شام 4 بجے تک گھر میں رہیں
- ہلکے رنگ کے ڈھیلے سوتی کپڑے پہنیں
- تربوز، ککڑی جیسے پھل کھائیں

### ایمرجنسی فرسٹ ایڈ
١. فوری طور پر سائے میں لے جائیں
٢. اضافی کپڑے اتاریں
٣. پانی سے ٹھنڈا کریں
٤. ایمرجنسی سروسز (1122) کو فوری کال کریں`,
  },
  {
    id: '11',
    slug: 'seasonal-allergies-pakistan',
    title: 'Managing Seasonal Allergies in Pakistan',
    titleUrdu: 'پاکستان میں موسمی الرجی کا انتظام',
    excerpt: 'How to deal with pollen allergies, dust, and seasonal respiratory issues common in Punjab.',
    excerptUrdu: 'پنجاب میں عام پولن الرجی، دھول، اور موسمی سانس کے مسائل سے کیسے نمٹیں۔',
    category: 'Allergies',
    icon: 'wind',
    readTime: '5 min',
    date: '2026-03-25',
    image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=800&q=80',
    tags: ['allergies', 'pollen', 'respiratory', 'seasonal'],
    content: `## Managing Seasonal Allergies in Pakistan

### Common Allergens in Punjab

#### Spring (February-April)
- **Paper mulberry pollen** — the #1 allergen in Lahore and surrounding areas
- Grass pollen
- Crop dust from wheat harvest

#### Summer (May-August)
- Dust and sand storms
- Mold from humidity
- Smog residue

#### Autumn/Winter (October-January)
- Rice stubble burning smoke
- Smog (especially in Lahore belt)
- Indoor dust mites

### Symptoms of Seasonal Allergies
- Sneezing fits (especially morning)
- Runny or blocked nose
- Itchy, watery eyes
- Scratchy throat
- Wheezing or cough
- Skin rashes

### Treatment Options

#### Over-the-Counter Medicines
- **Antihistamines**: Cetirizine (Zyrtec), Loratadine (Claritin) — take daily during allergy season
- **Nasal sprays**: Fluticasone (Flonase) — use daily for prevention
- **Eye drops**: Sodium cromoglicate — for itchy, watery eyes
- **Decongestants**: Short-term use only (3-5 days max)

#### Home Remedies
- Steam inhalation with menthol
- Honey (local honey may help build tolerance)
- Nasal irrigation with saline water
- Ginger and turmeric tea

### Prevention Tips
- Keep windows closed during high pollen days
- Use air purifier indoors
- Shower after coming home from outside
- Wear a mask during smog season
- Wash bed linens weekly in hot water
- Avoid hanging clothes outside to dry during pollen season`,
    contentUrdu: `## پاکستان میں موسمی الرجی کا انتظام

### پنجاب میں عام الرجین

#### بہار (فروری-اپریل)
- **پیپر ملبری کا پولن** — لاہور اور آس پاس کے علاقوں میں سب سے بڑا الرجین
- گھاس کا پولن
- گندم کی کٹائی سے دھول

#### گرمی (مئی-اگست)
- دھول اور ریت کے طوفان
- نمی سے پھپھوندی

### علامات
- چھینکیں آنا
- ناک بہنا یا بند ہونا
- آنکھوں میں خارش
- گلے میں خراش

### علاج کے طریقے

#### بغیر نسخے کی دوائیں
- **اینٹی ہسٹامین**: سیٹریزین — الرجی کے موسم میں روزانہ لیں
- **ناک کے سپرے**: فلوٹیکاسون — روک تھام کے لیے روزانہ استعمال کریں
- **آنکھوں کے قطرے**: خارش والی آنکھوں کے لیے

#### گھریلو علاج
- بھاپ لینا
- نمکین پانی سے ناک صاف کرنا
- ادرک اور ہلدی کی چائے

### بچاؤ کے طریقے
- زیادہ پولن والے دنوں میں کھڑکیاں بند رکھیں
- باہر سے آ کر نہائیں
- سموگ کے موسم میں ماسک پہنیں`,
  },
];
