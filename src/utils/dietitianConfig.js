export const defaultDietitianConfig = {
  profile: {
    name: "Dyt. Zehra Abacı",
    titleTr: "Uzman Diyetisyen & Sürdürülebilir Beslenme Danışmanı",
    titleEn: "Specialist Dietitian & Sustainable Nutrition Consultant",
    bioTr: "Zehra Abacı, sağlıklı yaşamı bir kısıtlama değil, sürdürülebilir bir yaşam tarzı olarak benimsemiş, kişiye özel beslenme programları ile binlerce danışanının hedeflerine ulaşmasını sağlamış uzman bir diyetisyendir. Mezuniyetinin ardından Fonksiyonel Tıp Beslenmesi, Sporcu Diyeti ve Sürdürülebilir Kilo Yönetimi üzerine uzmanlık eğitimleri almıştır. SUDA-DİYETİSYEN çatısı altında danışanlarına online ve yüz yüze hizmet vermektedir.",
    bioEn: "Zehra Abacı is a specialist dietitian who has adopted healthy living not as a restriction but as a sustainable lifestyle, helping thousands of clients achieve their goals through personalized nutrition programs. Following her graduation, she received specialized training in Functional Medicine Nutrition, Sports Diet, and Sustainable Weight Management. She offers online and face-to-face services under the SUDA-DIETITIAN brand.",
    image: "https://images.unsplash.com/photo-1594824813573-246434e33963?q=80&w=600&auto=format&fit=crop",
    phone: "0551 031 10 29",
    phoneRaw: "05510311029",
    whatsapp: "905510311029",
    email: "dyt.zehraabaci@gmail.com",
    addressTr: "Suda Sağlıklı Yaşam Plaza, Kat: 3 No: 12, Alsancak, İzmir",
    addressEn: "Suda Healthy Life Plaza, Floor: 3 No: 12, Alsancak, Izmir",
    workingHoursTr: "Hafta İçi: 09:00 - 18:00 | Cumartesi: 10:00 - 15:00",
    workingHoursEn: "Weekdays: 09:00 - 18:00 | Saturday: 10:00 - 15:00",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    visionTr: "Bireylerin beslenme algısını 'kısıtlama ve yasaklar' zincirinden kurtarıp, bedenlerini sevgiyle besledikleri ömürlük bir alışkanlığa dönüştürmelerine öncülük etmek.",
    visionEn: "To lead individuals to free their perception of nutrition from the chain of 'restrictions and prohibitions' and turn it into a lifetime habit where they nourish their bodies with love.",
    missionTr: "Bilimsel veriler ışığında, her danışanın metabolik ihtiyaçlarına, sosyal yaşamına ve hedeflerine en uygun esnek ve sürdürülebilir beslenme planlarını hazırlamak.",
    missionEn: "In the light of scientific data, preparing flexible and sustainable nutrition plans that best fit the metabolic needs, social life, and goals of each client."
  },
  availableHours: [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", 
    "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
  ],
  services: [
    {
      id: "online-diet",
      icon: "Globe",
      titleTr: "Online Diyet & Danışmanlık",
      titleEn: "Online Diet & Consulting",
      shortDescTr: "Mesafe tanımaksızın, haftalık takipler ve WhatsApp desteği ile hedeflerinize evinizden ulaşın.",
      shortDescEn: "Reach your goals from home, regardless of distance, with weekly follow-ups and WhatsApp support.",
      fullDescTr: "Dünyanın neresinde olursanız olun, görüntülü görüşmeler, haftalık ölçüm takipleri, size özel güncellenen listeler ve gün boyu WhatsApp soru-cevap desteği içeren premium online danışmanlık hizmetidir.",
      fullDescEn: "Premium online consulting service including video calls, weekly measurement follow-ups, customized lists updated for you, and all-day WhatsApp Q&A support, wherever you are in the world.",
      techs: ["Haftalık Takip", "Görüntülü Görüşme", "WhatsApp Desteği", "Kişiye Özel Liste"]
    },
    {
      id: "weight-management",
      icon: "Activity",
      titleTr: "Kilo Verme & Kilo Alma Yönetimi",
      titleEn: "Weight Loss & Weight Gain Management",
      shortDescTr: "Aç kalmadan, kas kaybı yaşamadan sağlıklı zayıflayın veya temiz kas kütlesiyle kilo alın.",
      shortDescEn: "Lose weight healthily without starving or losing muscle, or gain weight with clean muscle mass.",
      fullDescTr: "Metabolizma hızınıza ve kan tahlillerinize uygun, yağ yakımını maksimize eden veya sağlıklı kilo almanızı sağlayan, açlık krizleri yaşatmayan bilimsel beslenme programlarıdır.",
      fullDescEn: "Scientific nutrition programs suitable for your metabolic rate and blood tests, maximizing fat loss or providing healthy weight gain, without causing hunger crises.",
      techs: ["Yağ Yakımı", "Kas Kazanımı", "Vücut Analizi", "Sürdürülebilir Alışkanlık"]
    },
    {
      id: "sports-nutrition",
      icon: "Zap",
      titleTr: "Sporcu Beslenmesi & Performans",
      titleEn: "Sports Nutrition & Performance",
      shortDescTr: "Antrenman performansınızı artıracak, toparlanmayı hızlandıracak makro odaklı diyet planları.",
      shortDescEn: "Macro-focused diet plans to increase training performance and speed up recovery.",
      fullDescTr: "Yaptığınız spor branşına, antrenman yoğunluğunuza ve hedeflerinize (yağ yakımı, hacim kazanma vb.) özel olarak hazırlanan, protein, karbonhidrat ve yağ dengesi optimize edilmiş özel planlama.",
      fullDescEn: "Optimized planning of protein, carbohydrate, and fat balance, prepared specifically for your sports discipline, training intensity, and goals (fat burning, bulking, etc.).",
      techs: ["Makro Hesaplama", "Pre/Post Workout", "Toparlanma (Recovery)", "Performans Artışı"]
    },
    {
      id: "corporate-diet",
      icon: "Users",
      titleTr: "Kurumsal Beslenme Danışmanlığı",
      titleEn: "Corporate Nutrition Consulting",
      shortDescTr: "Şirket çalışanlarınızın enerjisini ve verimliliğini sağlıklı beslenme ile artırın.",
      shortDescEn: "Increase the energy and productivity of your corporate employees with healthy nutrition.",
      fullDescTr: "Ofis çalışanlarına yönelik sağlıklı menü planlamaları, kurumsal seminerler, bireysel çalışan vücut analizleri ve iş yerinde zindeliği artıracak beslenme rehberleri paketi.",
      fullDescEn: "Healthy menu planning for office workers, corporate seminars, individual employee body analysis, and nutrition guides package to increase workplace wellness.",
      techs: ["Ofis Sağlığı", "Sağlıklı Menü Planlama", "Motivasyon Seminerleri", "Zindelik"]
    }
  ],
  recipes: [
    {
      id: "recipe_1",
      titleTr: "Fıstık Ezmeli Fit Yulaf Lapası",
      titleEn: "Peanut Butter Fit Oatmeal Bowl",
      category: "Kahvaltılık",
      categoryEn: "Breakfast",
      prepTime: "10 Dk",
      prepTimeEn: "10 Mins",
      calories: 320,
      ingredientsTr: "4 yemek kaşığı yulaf ezmesi, 1 su bardağı yağsız süt, 1 tatlı kaşığı fıstık ezmesi, yarım muz, 1 çay kaşığı tarçın, 1 tatlı kaşığı chia tohumu.",
      ingredientsEn: "4 tbsp oatmeal, 1 cup skimmed milk, 1 tsp peanut butter, half a banana, 1 tsp cinnamon, 1 tsp chia seeds.",
      instructionsTr: "Yulaf ve sütü küçük bir tencerede lapa kıvamına gelene kadar pişirin. Kaseye alıp üzerine fıstık ezmesini ekleyin. Muz dilimleri, tarçın ve chia tohumu ile süsleyerek servis yapın.",
      instructionsEn: "Cook oatmeal and milk in a small saucepan until it becomes porridge. Transfer to a bowl and add peanut butter. Garnish with banana slices, cinnamon, and chia seeds to serve.",
      image: "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "recipe_2",
      titleTr: "Fırında Baharatlı Çıtır Nohut Cipsi",
      titleEn: "Baked Spicy Crispy Chickpeas",
      category: "Atıştırmalık",
      categoryEn: "Snack",
      prepTime: "25 Dk",
      prepTimeEn: "25 Mins",
      calories: 180,
      ingredientsTr: "1 su bardağı haşlanmış nohut, 1 yemek kaşığı zeytinyağı, 1 çay kaşığı toz kırmızı biber, yarım çay kaşığı kimyon, çeyrek çay kaşığı tuz, kekik.",
      ingredientsEn: "1 cup boiled chickpeas, 1 tbsp olive oil, 1 tsp paprika, half a tsp cumin, quarter tsp salt, thyme.",
      instructionsTr: "Haşlanmış nohutları iyice kurulayın. Zeytinyağı ve baharatlarla harmanlayıp yağlı kağıt serili fırın tepsisine yayın. 200 derece fırında 20-25 dakika çıtırdayana kadar pişirin.",
      instructionsEn: "Dry the boiled chickpeas thoroughly. Mix with olive oil and spices, then spread on a baking sheet lined with parchment paper. Bake at 200°C for 20-25 minutes until crispy.",
      image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "recipe_3",
      titleTr: "Avokadolu & Narlı Kinoa Salatası",
      titleEn: "Avocado & Pomegranate Quinoa Salad",
      category: "Öğle / Akşam",
      categoryEn: "Lunch / Dinner",
      prepTime: "15 Dk",
      prepTimeEn: "15 Mins",
      calories: 290,
      ingredientsTr: "4 yemek kaşığı haşlanmış kinoa, yarım avokado, 2 yemek kaşığı nar tanesi, bol yeşillik (roka, maydanoz, nane), 1 tatlı kaşığı zeytinyağı, limon suyu.",
      ingredientsEn: "4 tbsp boiled quinoa, half an avocado, 2 tbsp pomegranate seeds, plenty of greens (arugula, parsley, mint), 1 tsp olive oil, lemon juice.",
      instructionsTr: "Geniş bir kasede doğranmış yeşillikleri ve haşlanmış kinoayı karıştırın. Üzerine dilimlenmiş avokadoyu ve nar tanelerini ekleyin. Zeytinyağı ve limon sosunu gezdirip servis edin.",
      instructionsEn: "Mix chopped greens and boiled quinoa in a large bowl. Add sliced avocado and pomegranate seeds. Drizzle with olive oil and lemon juice, then serve.",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=400&auto=format&fit=crop"
    }
  ],
  transformations: [
    {
      id: "trans_1",
      name: "Ebru K.",
      lostWeight: "-18 kg",
      durationTr: "4 Ayda",
      durationEn: "In 4 Months",
      commentTr: "Zehra Hanım sayesinde hiç aç kalmadan, tatlı krizleriyle nasıl baş edeceğimi öğrenerek hedefime ulaştım. Hayatım değişti!",
      commentEn: "Thanks to Ms. Zehra, I achieved my goal without ever starving, learning how to handle sweet cravings. My life has changed!",
      statsTr: "Yağ Oranı: %34 -> %22 | Enerji Seviyesi: Maksimum",
      statsEn: "Fat Ratio: 34% -> 22% | Energy Level: Maximum"
    },
    {
      id: "trans_2",
      name: "Mustafa B.",
      lostWeight: "-24 kg",
      durationTr: "6 Ayda",
      durationEn: "In 6 Months",
      commentTr: "Yüksek tansiyon ve insülin direncim vardı. Diyet listelerim tamamen bana özel ve yaşam tarzıma uygundu. Tüm tahlillerim normale döndü.",
      commentEn: "I had high blood pressure and insulin resistance. My diet lists were completely customized and fit my lifestyle. All my tests returned to normal.",
      statsTr: "Bel Çevresi: -16 cm | İnsülin Direnci: Kırıldı",
      statsEn: "Waistline: -16 cm | Insulin Resistance: Overcome"
    },
    {
      id: "trans_3",
      name: "Selin G.",
      lostWeight: "+7 kg (Temiz Kas)",
      durationTr: "3 Ayda",
      durationEn: "In 3 Months",
      commentTr: "Çok zayıftım ve kilo alamıyordum. Sporcu beslenmesi ve hacim kazanma programıyla sağlıklı ve fit bir şekilde kilo almayı başardım.",
      commentEn: "I was too skinny and couldn't gain weight. With the sports nutrition and muscle volume program, I managed to gain weight healthily and fit.",
      statsTr: "Kas Kütlesi: +4.8 kg | Yağ Oranı: Stabil",
      statsEn: "Muscle Mass: +4.8 kg | Fat Ratio: Stable"
    }
  ],
  blogs: [
    {
      id: "blog_1",
      titleTr: "Su Tüketiminin Yağ Yakımı ve Metabolizma Üzerindeki Gizli Gücü",
      titleEn: "The Hidden Power of Water Consumption on Fat Burning and Metabolism",
      categoryTr: "Beslenme Bilimi",
      categoryEn: "Nutrition Science",
      date: "12 Temmuz 2026",
      readTimeTr: "4 Dk Okuma",
      readTimeEn: "4 Min Read",
      summaryTr: "Günlük su tüketiminin kilo verme hızınızı doğrudan nasıl etkilediğini ve bazal metabolizmayı nasıl canlandırdığını bilimsel gerçeklerle öğrenin.",
      summaryEn: "Learn scientific facts about how daily water intake directly affects your weight loss rate and activates BMR.",
      contentTr: "Vücudumuzun yaklaşık %60'ı sudan oluşur ve tüm hücre içi reaksiyonlar suyun varlığıyla sürdürülür. Yetersiz su içildiğinde, karaciğer yağları enerjiye dönüştürme görevini tam yapamaz çünkü böbreklerin yükünü hafifletmek zorunda kalır. Güne 2 bardak su ile başlamak metabolizmanızı %24 hızlandırır. Öğünlerden önce içilen su ise porsiyonlarınızı azaltmanıza yardımcı olur. Kilo başına 33 ml su içmeyi alışkanlık haline getirmelisiniz.",
      contentEn: "About 60% of our body consists of water. When insufficient water is consumed, the liver cannot convert fats to energy efficiently because it must offload kidney stress. Starting the day with 2 cups of water boosts BMR by 24%. Spread water intake throughout your day to avoid dehydrating tissues.",
      image: "https://images.unsplash.com/photo-1548839130-3fd96cd5bd4d?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "blog_2",
      titleTr: "İnsülin Direncini Kırmanın ve Tatlı Krizlerini Önlemenin Yolları",
      titleEn: "Ways to Break Insulin Resistance and Prevent Sweet Cravings",
      categoryTr: "Fonksiyonel Tıp",
      categoryEn: "Functional Medicine",
      date: "10 Temmuz 2026",
      readTimeTr: "5 Dk Okuma",
      readTimeEn: "5 Min Read",
      summaryTr: "Yemeklerden sonra gelen uyku hali ve geçmeyen tatlı krizleri insülin direncinin habercisi olabilir. Direnci kırmak için 5 pratik kural.",
      summaryEn: "Sleepiness after meals and persistent sweet cravings may indicate insulin resistance. Here are 5 rules to break the loop.",
      contentTr: "İnsülin direnci, hücrelerin şekeri enerjiye çevirmesini engeller ve sürekli açlık/tatlı isteği yaratır. Direnci kırmanın ilk adımı basit karbonhidratları (beyaz un, şeker) hayatımızdan çıkarmaktır. \n\n1. Her öğünde kaliteli protein ve lif tüketin.\n2. Ara öğünlerde kuruyemiş veya meyveyi yoğurtla birleştirin.\n3. Haftada en az 150 dakika tempolu yürüyün.\n4. Akşam 8'den sonra yemek yemeyi bırakın.\n5. Tarçın ve yeşil çayın kan şekerini dengeleyici etkisinden yararlanın.",
      contentEn: "Insulin resistance blocks glucose entry into cells, leading to constant hunger. To break this resistance: \n1. Integrate protein and fiber in meals.\n2. Combine fruit snacks with yogurt.\n3. Walk 150 mins weekly.\n4. Avoid eating past 8 PM.\n5. Leverage cinnamon and green tea to balance blood glucose levels.",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "blog_3",
      titleTr: "Aç Kalmadan Sağlıklı ve Sürdürülebilir Zayıflamanın Sırları",
      titleEn: "Secrets of Healthy and Sustainable Weight Loss Without Starving",
      categoryTr: "Kilo Yönetimi",
      categoryEn: "Weight Management",
      date: "08 Temmuz 2026",
      readTimeTr: "6 Dk Okuma",
      readTimeEn: "6 Min Read",
      summaryTr: "Şok diyetlerle metabolizmanızı yavaşlatmak yerine, porsiyon kontrolü ve doğru besin eşleşmeleri ile kalıcı kilo kayıpları elde edin.",
      summaryEn: "Instead of slowing down BMR with crash diets, achieve permanent weight loss with portion control and food pairings.",
      contentTr: "Şok diyetler vücudun kıtlık moduna girmesine, kas kaybetmesine ve diyet bittikten sonra fazlasıyla geri alınmasına neden olur. Zayıflamanın altın kuralı, aldığınız kaloriyi kısmak değil, besinlerin kalitesini artırmaktır. Hacmi büyük, kalorisi düşük besinlere (marul, salatalık, kabak, yulaf) tabaklarınızda yer verin. Çiğneme sürenizi uzatın ve yavaş yiyin. Vücudun doyma sinyali beyne 20 dakikada ulaşır.",
      contentEn: "Crash diets force the body into starvation mode, losing muscle weight. The key is nutrition density: high volume, low calorie options like greens and oats keep you full. Eat slowly, as satiety signals take 20 minutes to reach the brain.",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=400&auto=format&fit=crop"
    }
  ],
  faqs: [
    {
      id: 1,
      questionTr: "Online diyet programları nasıl işliyor?",
      questionEn: "How do online diet programs work?",
      answerTr: "Görüntülü veya sesli ilk görüşmemizde hedeflerinizi, kan tahlillerinizi ve yaşam tarzınızı analiz ediyoruz. Ardından haftalık olarak size özel beslenme listeleri hazırlıyor, her hafta kilo takibi yaparak listeleri güncelliyoruz. Gün içerisinde WhatsApp üzerinden bana doğrudan sorularınızı iletebiliyorsunuz.",
      answerEn: "In our first video or audio consultation, we analyze your goals, blood tests, and lifestyle. Then, we prepare personalized weekly nutrition lists and update them by tracking weight weekly. You can send your questions directly to me via WhatsApp throughout the day."
    },
    {
      id: 2,
      questionTr: "Diyet listelerinde pahalı veya bulunması zor ürünler oluyor mu?",
      questionEn: "Are there expensive or hard-to-find ingredients in the diet lists?",
      answerTr: "Kesinlikle hayır. Tamamen evinizde pişen, marketlerde kolayca bulabileceğiniz mevsimsel ve bütçe dostu gıdalarla çalışıyoruz. Sürdürülebilirlik bizim için en önemli kriterdir.",
      answerEn: "Absolutely not. We work with seasonal and budget-friendly foods that are cooked in your home and easily found in supermarkets. Sustainability is our most important criterion."
    },
    {
      id: 3,
      questionTr: "Diyet yaparken aç kalacak mıyım?",
      questionEn: "Will I starve while dieting?",
      answerTr: "Hayır. Diyet aç kalmak değil, doğru besinleri doğru porsiyonlarda tüketmektir. Metabolizmanızı canlı tutmak ve kan şekerini dengelemek adına doyurucu porsiyonlar ve lif oranı yüksek öğünler planlıyoruz.",
      answerEn: "No. Dieting is not starving; it is consuming the right foods in the right portions. We plan filling portions and fiber-rich meals to keep your metabolism active and balance blood sugar."
    },
    {
      id: 4,
      questionTr: "Kan tahlili yaptırmam gerekiyor mu?",
      questionEn: "Do I need to get a blood test?",
      answerTr: "Sağlıklı bir başlangıç için son 6 ai içinde yapılmış kan tahlillerinizi incelemek çok önemlidir. İnsülin direnci, tiroid fonksiyonları, vitamin ve mineral eksiklikleri diyet listemizin seyrini belirler. Eğer tahliliniz yoksa, aile hekiminizde yaptırmanız gereken testleri size iletiyoruz.",
      answerEn: "For a healthy start, it is very important to examine your blood tests from the last 6 months. Insulin resistance, thyroid functions, vitamin and mineral deficiencies determine the course of our diet list. If you don't have a test, we let you know which tests to request from your physician."
    }
  ]
};
