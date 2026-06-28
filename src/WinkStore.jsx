import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

// ─── SUPABASE CLIENT ──────────────────────────────────────────────────────────
const SUPABASE_URL = "https://kwoqndvliwjppemjqrri.supabase.co";
const SUPABASE_KEY = "sb_publishable_y6EsE2YQgWm-Tbpt90iMbA_Aa7qJJez";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ─── ALGERIA DATA ─────────────────────────────────────────────────────────────
// ─── SHIPPING RATES FROM ANDERSON ECOMMERCE ─────────────────────────────────
const SHIPPING_RATES = [
  {id:1, name:"Adrar", delay:"J+1/J+5", domicile:1400, bureau:700},
  {id:2, name:"Chlef", delay:"J/J+1", domicile:650, bureau:450},
  {id:3, name:"Laghouat", delay:"J/J+1", domicile:750, bureau:600},
  {id:4, name:"Oum-El-Bouaghi", delay:"J/J+1", domicile:850, bureau:600},
  {id:5, name:"Batna", delay:"J/J+1", domicile:850, bureau:500},
  {id:6, name:"Béjaïa", delay:"J/J+1", domicile:850, bureau:500},
  {id:7, name:"Biskra", delay:"J/J+1", domicile:750, bureau:600},
  {id:8, name:"Béchar", delay:"J/J+3", domicile:1100, bureau:650},
  {id:9, name:"Blida", delay:"J/J+1", domicile:750, bureau:450},
  {id:10, name:"Bouira", delay:"J/J+1", domicile:750, bureau:450},
  {id:11, name:"Tamanrasset", delay:"J/J+7", domicile:1600, bureau:1000},
  {id:12, name:"Tébessa", delay:"J/J+1", domicile:850, bureau:500},
  {id:13, name:"Tlemcen", delay:"J/J+1", domicile:700, bureau:500},
  {id:14, name:"Tiaret", delay:"J/J+2", domicile:650, bureau:450},
  {id:15, name:"Tizi-Ouzou", delay:"J/J+1", domicile:750, bureau:500},
  {id:16, name:"Alger", delay:"J/J+1", domicile:600, bureau:450},
  {id:17, name:"Djelfa", delay:"J/J+1", domicile:750, bureau:600},
  {id:18, name:"Jijel", delay:"J/J+2", domicile:850, bureau:550},
  {id:19, name:"Sétif", delay:"J/J+1", domicile:850, bureau:550},
  {id:20, name:"Saïda", delay:"J/J+2", domicile:650, bureau:450},
  {id:21, name:"Skikda", delay:"J/J+1", domicile:800, bureau:550},
  {id:22, name:"Sidi Bel Abbès", delay:"J/J+1", domicile:700, bureau:450},
  {id:23, name:"Annaba", delay:"J/J+1", domicile:800, bureau:450},
  {id:24, name:"Guelma", delay:"J/J+1", domicile:800, bureau:450},
  {id:25, name:"Constantine", delay:"J/J+1", domicile:800, bureau:450},
  {id:26, name:"Médéa", delay:"J/J+1", domicile:750, bureau:500},
  {id:27, name:"Mostaganem", delay:"J/J+1", domicile:550, bureau:450},
  {id:28, name:"M'sila", delay:"J/J+1", domicile:800, bureau:500},
  {id:29, name:"Mascara", delay:"J/J+1", domicile:550, bureau:400},
  {id:30, name:"Ouargla", delay:"J/J+2", domicile:950, bureau:600},
  {id:31, name:"Oran", delay:"J/J+1", domicile:550, bureau:450},
  {id:32, name:"El Bayadh", delay:"J/J+3", domicile:950, bureau:600},
  {id:33, name:"Illizi", delay:"J/J+7", domicile:2000, bureau:800},
  {id:34, name:"Bordj Bou Arreridj", delay:"J/J+1", domicile:800, bureau:500},
  {id:35, name:"Boumerdès", delay:"J/J+1", domicile:750, bureau:500},
  {id:36, name:"El-Tarf", delay:"J/J+1", domicile:850, bureau:600},
  {id:37, name:"Tindouf", delay:"J/J+7", domicile:1300, bureau:null},
  {id:38, name:"Tissemsilt", delay:"J/J+2", domicile:650, bureau:null},
  {id:39, name:"El-Oued", delay:"J/J+1", domicile:950, bureau:600},
  {id:40, name:"Khenchela", delay:"J/J+2", domicile:950, bureau:500},
  {id:41, name:"Souk-Ahras", delay:"J/J+1", domicile:850, bureau:500},
  {id:42, name:"Tipaza", delay:"J/J+1", domicile:750, bureau:450},
  {id:43, name:"Mila", delay:"J/J+1", domicile:800, bureau:500},
  {id:44, name:"Aïn-Defla", delay:"J/J+1", domicile:650, bureau:450},
  {id:45, name:"Naâma", delay:"J/J+3", domicile:1000, bureau:500},
  {id:46, name:"Aïn-Témouchent", delay:"J/J+1", domicile:700, bureau:450},
  {id:47, name:"Ghardaïa", delay:"J/J+2", domicile:900, bureau:600},
  {id:48, name:"Relizane", delay:"J/J+1", domicile:500, bureau:350},
  {id:49, name:"Timimoune", delay:"j/j+5", domicile:1400, bureau:null},
  {id:50, name:"Bordj Badji Mokhtar", delay:"j/j+6", domicile:2000, bureau:null},
  {id:51, name:"Ouled Djellal", delay:"j/j+2", domicile:1000, bureau:600},
  {id:52, name:"Beni Abbès", delay:"j/j+4", domicile:1100, bureau:null},
  {id:53, name:"In Salah", delay:"j/j+6", domicile:1600, bureau:800},
  {id:54, name:"In Guezzam", delay:"j/j+6", domicile:2000, bureau:null},
  {id:55, name:"Touggourt", delay:"j/j+3", domicile:850, bureau:500},
  {id:56, name:"Djanet", delay:"j/j+6", domicile:2000, bureau:800},
  {id:57, name:"El Mghair", delay:"j/j+3", domicile:1000, bureau:null},
  {id:58, name:"El Meniaa", delay:"j/j+3", domicile:1000, bureau:null},
];

const WILAYAS = [
  { code:"01", name:"أدرار", communes:["أدرار","رقان","تيميمون","بورج باجي مختار","أولف","فنوغيل","تامنطيط","زاوية كنتة","تسابيت","أنزاجمير","أقبلي","بودة"] },
  { code:"02", name:"الشلف", communes:["الشلف","تنس","أم الدروع","أبو الحسن","برج بونعامة","بنايرية","بوقدير","الصبحة","شطية","الحجادة","العثامنة","تاوقريت","واد قوسين","الكريمية","خميستي","سيدي عكاشة","لحلاف","المرسى","الظهرة","زلاطة"] },
  { code:"03", name:"الأغواط", communes:["الأغواط","كسر الحيران","قلتة سيدي سعد","عين ماضي","تاجموت","قصر الحيران","حاسي الرمل","برج الخيرة","السبعة","الغيشة","آفلو","عين سيدي علي","سبقاق","سيدي بوزيد","الخنق"] },
  { code:"04", name:"أم البواقي", communes:["أم البواقي","عين البيضاء","عين مليلة","عين الديس","عين الفارس","عين البركي","مسكيانة","سوق نعمان","ضلعة","فكيرينة","الزرق","الجازية","ضرية","كيمل"] },
  { code:"05", name:"باتنة", communes:["باتنة","عين توتة","مروانة","آريس","نقاوس","بريكة","المعذر","رأس العيون","أولاد سي سليمان","تكوت","سيدي معصوص","عين جاسر","تازولت","قصر بلزمة","ثنية العابد"] },
  { code:"06", name:"بجاية", communes:["بجاية","العوانة","فرعون","تيشي","ببرت","أقبو","خراطة","كرات","تاسكريوت","إيجر","تيزي نبرير","صدوق","إفري","بني كسيلة","تيفرة","سوق الوقواق"] },
  { code:"07", name:"بسكرة", communes:["بسكرة","طولقة","واد جلال","أولاد جلال","الشعيبة","فوغالة","أوماش","البسباس","البرانيس","مشونش","خنقة سيدي ناجي","الحاجب","الفيض","سيدي عقبة","ليشانة"] },
  { code:"08", name:"بشار", communes:["بشار","عبادلة","قنادسة","بني ونيف","كرزاز","لحمر","تاغيت","موغل","طبلبالة","مريجة"] },
  { code:"09", name:"البليدة", communes:["البليدة","واد الأليل","موزاية","مفتاح","بوعرفة","المحمدية","ليربعة","شفعة","بني مراد","بني تامو","سيدي مصطفى","القليعة","بوركبة","واد دومر","عين رومانة"] },
  { code:"10", name:"البويرة", communes:["البويرة","سور الغزلان","المعمورة","بشلول","درباله","الأخضرية","أقبيل","لخزرة","برج اوخريص","آيت لزيز","الحجرة","واريزان","بودربالة"] },
  { code:"11", name:"تمنراست", communes:["تمنراست","إن جكار","آبالسا","إن غر"] },
  { code:"12", name:"تبسة", communes:["تبسة","الشريعة","عين الزيتونة","بكارية","بئر الذهب","الكويف","ونزة","بئر العاتر","العقلة","مرسط","ام علي","النقرين","فركان","تليلان"] },
  { code:"13", name:"تلمسان", communes:["تلمسان","مسيردة","الغزوات","ندرومة","فلاوسن","مغنية","جبالة","إيلافن","سوق الثلاثاء","سيدي سنوسي","بني خلاد","عين تالوت","بن سكران","الفحول"] },
  { code:"14", name:"تيارت", communes:["تيارت","سوق إهراس","قصر الشلالة","عين الذهب","مهدية","فرندة","رحوية","المهرية","بن شبيبة","واد ليلي","ملاكو","سيدي بختي","دبدابة","منداس"] },
  { code:"15", name:"تيزي وزو", communes:["تيزي وزو","ذراع بن خدة","واد العيسي","إيلولا ومالو","إفرحونن","أقبيل","مقلع","آيت خليلي","إزي عيسى","ثالا بوعينان","بوغني","واد فرح"] },
  { code:"16", name:"الجزائر العاصمة", communes:["باب الواد","المدنية","القصبة","الحراش","سطاوالي","البيار","حيدرة","الحامة","بن عكنون","القبة","الأبيار","الدار البيضاء","براقي","بئر مراد رايس","بئر خادم","الرغاية","حسين داي","بوزريعة","درارية","شراقة","دالي إبراهيم","وادي قريش","المرادية","بولوغين"] },
  { code:"17", name:"الجلفة", communes:["الجلفة","مسعد","سيدي بايزيد","حاسي بحبح","القطارة","بوسعادة","عين وسارة","عمورة","فيض البطمة","بني يعقوب","مقرن"] },
  { code:"18", name:"جيجل", communes:["جيجل","الطاهير","العوامر","الشقفة","تسالة","بني يعلى","غبالة","الشروين","قاوس","سيدي عبيد","أولاد حمزة","الأنصار"] },
  { code:"19", name:"سطيف", communes:["سطيف","قجال","عين أرنات","أموقران","البيضاء","سرج القصابين","بابار","مزلوق","واد الفضة","بني عزيز","العلمة","دراع الميزان"] },
  { code:"20", name:"سعيدة", communes:["سعيدة","عين السلطان","أولاد خالد","الحساسنة","واد الصباح","ونشريس","سيدي أحمد"] },
  { code:"21", name:"سكيكدة", communes:["سكيكدة","واد الزهور","فلفلة","القل","الحدائق","سيدي مزغيش","الحروش","عزابة","رمضان جمال","زردازة"] },
  { code:"22", name:"سيدي بلعباس", communes:["سيدي بلعباس","سيدي حمادوش","تسالة لمتاي","تلاغ","سيدي شعيب","سهالة","مولاي ادريس","مرغم","يحيى بن عمر"] },
  { code:"23", name:"عنابة", communes:["عنابة","البوني","الحجار","الشطابي","سرايدي","برحال","واد الجمعة","عين الباردة"] },
  { code:"24", name:"قالمة", communes:["قالمة","نشماية","هيليوبوليس","حملة","بوحشان","بوثلجة","المحيطي","شيقارة","الفجوج","مجاز عمار","اوبرق"] },
  { code:"25", name:"قسنطينة", communes:["قسنطينة","الخروب","ابن زياد","عين عبيد","حامة بوزيان","ابن باديس","الزيود","بني حميدان","جبل الوحش"] },
  { code:"26", name:"المدية", communes:["المدية","واد حربيل","سيدي ربوحة","بورجية","العزيزية","الشهبونية","الدجنان","أيت رابح","تافراوت","بوسكن","خميس الخشنة"] },
  { code:"27", name:"مستغانم", communes:["مستغانم","سيق","عين بودينار","الحسيان","واد المقطع","صافية","العامرية","خضرة","واد الكيحول","سيدي لخضر","بوقيراط","ستيدية"] },
  { code:"28", name:"المسيلة", communes:["المسيلة","سيدي عيسى","أولاد دراج","مقرة","بوسعادة","عين الملح","الهامل","سيدي عامر","الحمامة","الشلال","بنهار"] },
  { code:"29", name:"معسكر", communes:["معسكر","تيغنيف","المحمدية","واد الأبطال","محمد بن قايد","عين فراح","الغمري","سيدي قادة","كرميلس"] },
  { code:"30", name:"ورقلة", communes:["ورقلة","المنيعة","تقرت","العالية","الرويسات","تبسبست","المقارين","سيدي سليمان","حاسي مسعود"] },
  { code:"31", name:"وهران", communes:["وهران","الأندلس","السانية","مرسى الكبير","عين الترك","سيدي الشحمي","بئر الجير","أرزيو","طفراوي","الغلزان","واد تليلات","المسرغين"] },
  { code:"32", name:"البيض", communes:["البيض","بريزينة","الأبيض سيدي شيخ","الشقيق","سيدي سليمان","آفلو","أولاد خالد","تيوت","بوقطب"] },
  { code:"33", name:"إليزي", communes:["إليزي","دبداب","برج الحواس","إن أمناس"] },
  { code:"34", name:"برج بوعريريج", communes:["برج بوعريريج","بن داود","مانسورة","قصير الوادي","راس الوادي","القصور","المهير","الأنصار","ثنية العابد","حرازة"] },
  { code:"35", name:"بومرداس", communes:["بومرداس","دلس","خميس الخشنة","نجلوميا","برج منايل","الثينية","إسير","واد خزناجر","سي مصطفى","شعبة العامر","أولاد عيسى","الناصرية","تيجلابين"] },
  { code:"36", name:"الطارف", communes:["الطارف","الحدائق","الشافية","عين العسل","واد الزيتون","القالة","واد الكبير","شحنة","سوق الثنين","وادي بريس"] },
  { code:"37", name:"تندوف", communes:["تندوف","أم العسل"] },
  { code:"38", name:"تيسمسيلت", communes:["تيسمسيلت","تامدة","الأزهرية","برج الأمير خالد","العيون","الخميس","عين الأحجار","لاربعة","بوقايد","سيدي سليمان"] },
  { code:"39", name:"الوادي", communes:["الوادي","الرباح","الدبيلة","الطالب العربي","جامعة","ورماس","بن قشة","حاسي خليفة","تغزوت","البياضة","المرارة","سيدي خليل"] },
  { code:"40", name:"خنشلة", communes:["خنشلة","شلية","كاف الأحمر","آنق","محمل"] },
  { code:"41", name:"سوق أهراس", communes:["سوق أهراس","سدراتة","واد الكبريت","مداوروش","تاورة","الخضارة","الحنانشة","ام العدول","السوارة","الدريعة","مشروحة"] },
  { code:"42", name:"تيبازة", communes:["تيبازة","الدامازين","البرواقية","جدل","قوراية","فوكة","شرشال","سيدي رافع","بوهارون","إفرون","المصفى"] },
  { code:"43", name:"ميلة", communes:["ميلة","القرارم قوقة","تسادان هوادف","واد الأثمانية","واد النجاء","أحمد راشدي","واد سقان","سيدي مروان","شلغوم العيد"] },
  { code:"44", name:"عين الدفلى", communes:["عين الدفلى","عين سلطان","عريب","الأربعاء","الرحاية","سيدي الحسن","بوراشد","حمام ريغة","واد شورة","البرواقية","ملاح"] },
  { code:"45", name:"النعامة", communes:["النعامة","المشرية","عسلة","تيوت","القصدير","جنين بورقية","صفيصيفة","مقهر"] },
  { code:"46", name:"عين تموشنت", communes:["عين تموشنت","البلالعة","الأقب","حمام بوحجر","سيدي بن عدة","المسعدية","واد تليلات","سيدي الجيلالي","أولاد بوجمعة"] },
  { code:"47", name:"غرداية", communes:["غرداية","متليلي","بريان","المنيعة","القرارة","بنورة","زلفانة","العطف"] },
  { code:"48", name:"غليزان", communes:["غليزان","جديوية","العوينة","المصلحة","الرمكة","مازونة","واد رهيو","بلعسل","سيدي عمار","عمي موسى"] },
  { code:"49", name:"تيميمون", communes:["تيميمون","أولاد سعيد","منصورة","أقبلي","بودة"] },
  { code:"50", name:"برج باجي مختار", communes:["برج باجي مختار","تيملاين"] },
  { code:"51", name:"أولاد جلال", communes:["أولاد جلال","الدوسن","سيدي خالد","عمورة","الشعيبة"] },
  { code:"52", name:"بني عباس", communes:["بني عباس","الواتة","بودية","إقلي","لحمر"] },
  { code:"53", name:"عين صالح", communes:["عين صالح","فوقارت","إن الهايلة"] },
  { code:"54", name:"عين قزام", communes:["عين قزام","تيم وكتن"] },
  { code:"55", name:"توقرت", communes:["توقرت","المقارين","سيدي سليمان","البستان","تبسبست"] },
  { code:"56", name:"جانت", communes:["جانت","عين قزام"] },
  { code:"57", name:"المغير", communes:["المغير","جامعة","سيدي خليل","الرباح","تغزوت"] },
  { code:"58", name:"المنيعة", communes:["المنيعة","بريزينة","الفيض","حاسي الخبي"] },
];

// ─── SAMPLE DATA ──────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id:1, name:"إلكترونيات", icon:"💻", count:24 },
  { id:2, name:"ملابس", icon:"👕", count:18 },
  { id:3, name:"منزل ومطبخ", icon:"🏠", count:31 },
  { id:4, name:"رياضة", icon:"⚽", count:15 },
  { id:5, name:"جمال وعناية", icon:"✨", count:22 },
  { id:6, name:"كتب وتعليم", icon:"📚", count:9 },
];

const PRODUCTS = [
  { id:1, name:"سماعات لاسلكية احترافية", cat:1, price:4500, oldPrice:6000, stock:12, rating:4.7, reviews:89, emoji:"🎧", tags:["صوت","تقنية"], desc:"سماعات لاسلكية بجودة صوت استثنائية وعزل للضوضاء. بطارية تدوم 30 ساعة.", specs:["بلوتوث 5.3","بطارية 30 ساعة","عزل نشط للضوضاء","USB-C"] },
  { id:2, name:"ساعة ذكية رياضية", cat:1, price:8900, oldPrice:null, stock:7, rating:4.9, reviews:134, emoji:"⌚", tags:["رياضة","تقنية"], desc:"ساعة ذكية متكاملة بشاشة AMOLED ومتابعة صحية دقيقة.", specs:["شاشة AMOLED 1.4\"","GPS مدمج","مقاومة الماء 5ATM","بطارية 7 أيام"] },
  { id:3, name:"قميص قطني كلاسيكي", cat:2, price:1800, oldPrice:2500, stock:30, rating:4.5, reviews:56, emoji:"👔", tags:["موضة","كلاسيك"], desc:"قميص قطني عالي الجودة بقصة كلاسيكية أنيقة مناسبة للعمل والمناسبات.", specs:["قطن 100%","مقاسات S-3XL","غسيل بالغسالة","صنع في تركيا"] },
  { id:4, name:"طقم أواني طبخ", cat:3, price:12500, oldPrice:16000, stock:5, rating:4.8, reviews:47, emoji:"🍳", tags:["مطبخ","جودة"], desc:"طقم أواني طبخ من الاستانلس ستيل بجودة مطعم مكون من 8 قطع.", specs:["استانلس ستيل 304","8 قطع","مناسب للإندكشن","ضمان سنتان"] },
  { id:5, name:"حذاء رياضي خفيف", cat:4, price:5500, oldPrice:7000, stock:20, rating:4.6, reviews:203, emoji:"👟", tags:["رياضة","راحة"], desc:"حذاء رياضي خفيف الوزن بتقنية تهوية متقدمة مثالي للجري.", specs:["وزن 220g","مقاسات 38-46","نعل مطاطي","قابل للغسيل"] },
  { id:6, name:"كريم مرطب فاخر", cat:5, price:2200, oldPrice:3000, stock:45, rating:4.4, reviews:178, emoji:"🧴", tags:["عناية","بشرة"], desc:"كريم مرطب طبيعي بمستخلصات الأرغان والشيا يغذي البشرة ويمنحها نضارة.", specs:["100ml","مكونات طبيعية","خالي من البارابين","مناسب لجميع أنواع البشرة"] },
  { id:7, name:"لابتوب للطلاب", cat:1, price:55000, oldPrice:65000, stock:3, rating:4.5, reviews:67, emoji:"💻", tags:["تعليم","تقنية"], desc:"لابتوب خفيف عالي الأداء مثالي للطلاب والعمل اليومي.", specs:["RAM 16GB","SSD 512GB","شاشة 15.6\"","بطارية 10 ساعات"] },
  { id:8, name:"كتاب تطوير الذات", cat:6, price:950, oldPrice:null, stock:100, rating:4.3, reviews:312, emoji:"📖", tags:["تعلم","نجاح"], desc:"كتاب مميز في تطوير الذات وبناء العادات الإيجابية مترجم للعربية.", specs:["320 صفحة","عربي","غلاف مقوى","طبعة 2024"] },
];

const TESTIMONIALS = [
  { name:"أمينة بن علي", city:"الجزائر العاصمة", rating:5, text:"خدمة ممتازة والمنتجات بجودة عالية. التوصيل كان سريعاً جداً ما توقعتش." },
  { name:"كريم بوزيد", city:"وهران", rating:5, text:"أول مرة نشري من وينك ستور وما ندمتش. السعر مناسب والتغليف رائع." },
  { name:"سارة مزياني", city:"قسنطينة", rating:4, text:"تجربة تسوق ممتازة! الموقع سهل الاستخدام والمنتجات مطابقة للصور تماماً." },
];

let COUPONS_DB = { "WINK10":10, "WELCOME20":20, "DZ30":30 };

const FMT = (n) => n.toLocaleString("ar-DZ") + " دج";

// ─── STYLES ───────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap');

*,*::before,*::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --p: #2563EB;
  --p-dark: #1D4ED8;
  --p-light: #EFF6FF;
  --p-subtle: rgba(37,99,235,0.08);
  --bg: #FFFFFF;
  --bg2: #F8FAFC;
  --bg3: #F1F5F9;
  --border: #E2E8F0;
  --border2: #CBD5E1;
  --text: #0F172A;
  --text2: #475569;
  --text3: #94A3B8;
  --success: #10B981;
  --warning: #F59E0B;
  --danger: #EF4444;
  --radius: 10px;
  --radius2: 14px;
  --shadow-sm: 0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.06);
  --shadow: 0 4px 16px rgba(0,0,0,.08), 0 2px 4px rgba(0,0,0,.04);
  --shadow-lg: 0 10px 40px rgba(0,0,0,.1), 0 4px 12px rgba(0,0,0,.06);
  --nav-h: 64px;
}

[data-theme="dark"] {
  --bg: #0F172A;
  --bg2: #1E293B;
  --bg3: #334155;
  --border: #1E293B;
  --border2: #334155;
  --text: #F8FAFC;
  --text2: #94A3B8;
  --text3: #475569;
  --p-light: rgba(37,99,235,0.15);
  --p-subtle: rgba(37,99,235,0.12);
  --shadow-sm: 0 1px 3px rgba(0,0,0,.3);
  --shadow: 0 4px 16px rgba(0,0,0,.3);
  --shadow-lg: 0 10px 40px rgba(0,0,0,.4);
}

html { scroll-behavior: smooth; }

body {
  font-family: 'IBM Plex Sans Arabic', system-ui, sans-serif;
  background: var(--bg);
  color: var(--text);
  direction: rtl;
  -webkit-font-smoothing: antialiased;
  font-size: 15px;
  line-height: 1.6;
}

button, input, select, textarea { font-family: inherit; }
img { max-width: 100%; }

::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 99px; }

/* ─── LAYOUT ─────────────────────────── */
.app { min-height: 100vh; background: var(--bg); }
.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
.container-sm { max-width: 900px; margin: 0 auto; padding: 0 20px; }

/* ─── NAVBAR ─────────────────────────── */
.nav {
  height: var(--nav-h);
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  position: sticky; top: 0; z-index: 100;
  display: flex; align-items: center;
}
.nav-inner {
  width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 20px;
  display: flex; align-items: center; gap: 12px;
}
.nav-logo {
  display: flex; align-items: center; gap: 8px;
  cursor: pointer; text-decoration: none; color: var(--text);
  flex-shrink: 0;
}
.logo-mark {
  width: 34px; height: 34px;
  background: var(--p);
  border-radius: 9px;
  display: flex; align-items: center; justify-content: center;
  font-size: 17px; color: white; font-weight: 700;
  letter-spacing: -1px;
  flex-shrink: 0;
}
.logo-text {
  font-size: 17px; font-weight: 700;
  color: var(--text);
  letter-spacing: -0.3px;
}
.logo-text span { color: var(--p); }

.nav-search {
  flex: 1; max-width: 420px; margin: 0 16px;
  position: relative;
}
.nav-search input {
  width: 100%;
  background: var(--bg2);
  border: 1.5px solid var(--border);
  color: var(--text);
  padding: 8px 40px 8px 14px;
  border-radius: var(--radius);
  font-size: 14px;
  outline: none;
  transition: border-color .2s, background .2s;
}
.nav-search input:focus { border-color: var(--p); background: var(--bg); }
.nav-search-icon {
  position: absolute; top: 50%; transform: translateY(-50%);
  left: 12px; color: var(--text3); font-size: 15px; pointer-events: none;
}

.nav-links { display: flex; align-items: center; gap: 2px; margin-inline-end: auto; }
.nav-link {
  display: flex; align-items: center; gap: 5px;
  padding: 6px 12px; border-radius: 8px;
  font-size: 14px; font-weight: 500; color: var(--text2);
  cursor: pointer; background: none; border: none;
  transition: background .15s, color .15s;
  white-space: nowrap;
}
.nav-link:hover { background: var(--bg2); color: var(--text); }
.nav-link.active { color: var(--p); background: var(--p-light); }

.nav-actions { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
.nav-btn {
  position: relative;
  width: 38px; height: 38px;
  border-radius: var(--radius);
  border: 1.5px solid var(--border);
  background: var(--bg);
  color: var(--text2);
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px;
  transition: all .15s;
}
.nav-btn:hover { border-color: var(--p); color: var(--p); background: var(--p-light); }
.badge {
  position: absolute; top: -5px; right: -5px;
  background: var(--p); color: white;
  font-size: 10px; font-weight: 700;
  width: 18px; height: 18px; border-radius: 99px;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid var(--bg);
}

/* ─── BUTTONS ─────────────────────────── */
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 7px;
  font-size: 14px; font-weight: 600;
  padding: 10px 20px; border-radius: var(--radius);
  cursor: pointer; border: none;
  transition: all .18s; white-space: nowrap;
  font-family: inherit;
  text-decoration: none;
}
.btn:disabled { opacity: .5; cursor: not-allowed; }
.btn-primary {
  background: var(--p); color: white;
  box-shadow: 0 1px 3px rgba(37,99,235,.3);
}
.btn-primary:hover:not(:disabled) { background: var(--p-dark); box-shadow: 0 4px 12px rgba(37,99,235,.35); transform: translateY(-1px); }
.btn-secondary {
  background: var(--bg2); color: var(--text);
  border: 1.5px solid var(--border);
}
.btn-secondary:hover:not(:disabled) { background: var(--bg3); border-color: var(--border2); }
.btn-ghost { background: transparent; color: var(--text2); }
.btn-ghost:hover { background: var(--bg2); color: var(--text); }
.btn-danger { background: var(--danger); color: white; }
.btn-danger:hover:not(:disabled) { background: #DC2626; }
.btn-sm { padding: 7px 14px; font-size: 13px; }
.btn-lg { padding: 13px 28px; font-size: 15px; }
.btn-full { width: 100%; }
.btn-icon { padding: 8px; }

/* ─── FORM ─────────────────────────────── */
.field { display: flex; flex-direction: column; gap: 6px; }
.label {
  font-size: 13px; font-weight: 600; color: var(--text2);
}
.input, .select, .textarea {
  background: var(--bg);
  border: 1.5px solid var(--border);
  color: var(--text);
  padding: 10px 14px;
  border-radius: var(--radius);
  font-size: 14px;
  outline: none;
  transition: border-color .15s, box-shadow .15s;
  width: 100%;
  font-family: inherit;
}
.input:focus, .select:focus, .textarea:focus {
  border-color: var(--p);
  box-shadow: 0 0 0 3px var(--p-subtle);
}
.input.error, .select.error { border-color: var(--danger); }
.err-msg { font-size: 12px; color: var(--danger); margin-top: 2px; }
.textarea { resize: vertical; min-height: 100px; }
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
@media (max-width: 600px) { .grid-2, .grid-3 { grid-template-columns: 1fr; } }
.col-span-2 { grid-column: 1 / -1; }

/* ─── CARD ─────────────────────────────── */
.card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius2);
  overflow: hidden;
}
.card-pad { padding: 20px; }
.card-title {
  font-size: 16px; font-weight: 700;
  color: var(--text); margin-bottom: 16px;
}

/* ─── PRODUCT CARD ────────────────────── */
.product-card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius2);
  overflow: hidden;
  transition: box-shadow .2s, transform .2s;
  cursor: pointer;
  position: relative;
  display: flex; flex-direction: column;
}
.product-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-3px); }

.product-img {
  height: 180px;
  background: var(--bg2);
  display: flex; align-items: center; justify-content: center;
  font-size: 72px;
  position: relative;
  border-bottom: 1px solid var(--border);
  transition: background .2s;
}
.product-card:hover .product-img { background: var(--bg3); }

.product-img-actions {
  position: absolute; top: 8px; inset-inline-end: 8px;
  display: flex; flex-direction: column; gap: 6px;
  opacity: 0; transform: translateX(8px);
  transition: opacity .2s, transform .2s;
}
.product-card:hover .product-img-actions { opacity: 1; transform: translateX(0); }

.img-action-btn {
  width: 32px; height: 32px;
  background: white; border: 1px solid var(--border);
  border-radius: 8px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; box-shadow: var(--shadow-sm);
  transition: all .15s; color: var(--text2);
}
.img-action-btn:hover { border-color: var(--p); color: var(--p); background: var(--p-light); }
.img-action-btn.wishlisted { color: var(--danger); border-color: #FECACA; background: #FEF2F2; }

.p-badge {
  position: absolute; top: 8px; inset-inline-start: 8px;
  padding: 3px 8px; border-radius: 6px;
  font-size: 11px; font-weight: 700; line-height: 1.4;
}
.badge-sale { background: #FEE2E2; color: var(--danger); }
.badge-new { background: #DCFCE7; color: #15803D; }

.product-body { padding: 14px; flex: 1; display: flex; flex-direction: column; gap: 6px; }
.product-cat { font-size: 11px; font-weight: 600; color: var(--p); text-transform: uppercase; letter-spacing: .5px; }
.product-name { font-size: 14px; font-weight: 600; color: var(--text); line-height: 1.4; }
.product-rating { display: flex; align-items: center; gap: 5px; }
.stars-row { color: var(--warning); font-size: 12px; letter-spacing: 1px; }
.rating-count { font-size: 12px; color: var(--text3); }
.product-price { display: flex; align-items: center; gap: 8px; margin-top: auto; padding-top: 8px; }
.price-main { font-size: 16px; font-weight: 700; color: var(--p); }
.price-old { font-size: 13px; color: var(--text3); text-decoration: line-through; }
.price-save { font-size: 11px; background: #FEE2E2; color: var(--danger); padding: 2px 7px; border-radius: 5px; font-weight: 600; }

.product-add-row { padding: 12px 14px; border-top: 1px solid var(--border); }

/* ─── SHOP GRID ───────────────────────── */
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }

/* ─── HERO ─────────────────────────────── */
.hero {
  background: linear-gradient(135deg, var(--p) 0%, #1E40AF 100%);
  color: white;
  padding: 60px 0;
  position: relative;
  overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute; inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
.hero-inner { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: 0 20px; }
.hero-badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(255,255,255,.15); backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,.2);
  color: white; padding: 5px 14px; border-radius: 99px;
  font-size: 13px; font-weight: 500; margin-bottom: 20px;
}
.hero h1 { font-size: clamp(28px, 5vw, 48px); font-weight: 700; line-height: 1.2; margin-bottom: 14px; }
.hero p { font-size: 17px; opacity: .85; max-width: 500px; margin-bottom: 28px; }
.hero-actions { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.btn-white { background: white; color: var(--p); font-weight: 700; }
.btn-white:hover { background: #F0F4FF; }
.btn-outline-white { background: transparent; color: white; border: 2px solid rgba(255,255,255,.4); font-weight: 600; }
.btn-outline-white:hover { background: rgba(255,255,255,.1); border-color: white; }

.hero-stats { display: flex; gap: 28px; margin-top: 40px; padding-top: 32px; border-top: 1px solid rgba(255,255,255,.15); flex-wrap: wrap; }
.stat-block {}
.stat-num { font-size: 28px; font-weight: 700; display: block; }
.stat-lbl { font-size: 13px; opacity: .7; }

/* ─── SECTION ─────────────────────────── */
.section { padding: 48px 0; }
.section-sm { padding: 32px 0; }
.section-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; flex-wrap: wrap; gap: 10px; }
.section-title { font-size: 20px; font-weight: 700; color: var(--text); }
.section-sub { font-size: 14px; color: var(--text2); margin-top: 3px; }

/* ─── CATEGORIES ──────────────────────── */
.cats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; }
.cat-card {
  background: var(--bg);
  border: 1.5px solid var(--border);
  border-radius: var(--radius2);
  padding: 20px 12px;
  text-align: center; cursor: pointer;
  transition: all .18s;
  display: flex; flex-direction: column; align-items: center; gap: 8px;
}
.cat-card:hover { border-color: var(--p); background: var(--p-light); transform: translateY(-2px); }
.cat-icon { font-size: 32px; }
.cat-name { font-size: 14px; font-weight: 600; color: var(--text); }
.cat-count { font-size: 12px; color: var(--text3); }

/* ─── SHOP LAYOUT ─────────────────────── */
.shop-wrap { padding: 24px 0 48px; }
.shop-layout { display: grid; grid-template-columns: 230px 1fr; gap: 20px; align-items: start; }
@media (max-width: 768px) { .shop-layout { grid-template-columns: 1fr; } }

.sidebar {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius2);
  padding: 18px;
  position: sticky; top: calc(var(--nav-h) + 12px);
}
.sidebar-section { margin-bottom: 22px; padding-bottom: 22px; border-bottom: 1px solid var(--border); }
.sidebar-section:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
.sidebar-title { font-size: 12px; font-weight: 700; color: var(--text3); text-transform: uppercase; letter-spacing: .8px; margin-bottom: 12px; }

.filter-item {
  display: flex; align-items: center; gap: 9px;
  padding: 7px 10px; border-radius: 8px;
  font-size: 14px; color: var(--text2);
  cursor: pointer; transition: all .12s;
  background: none; border: none; width: 100%;
  text-align: start; font-family: inherit;
}
.filter-item:hover { background: var(--bg2); color: var(--text); }
.filter-item.active { background: var(--p-light); color: var(--p); font-weight: 600; }

.filter-check {
  width: 17px; height: 17px; border-radius: 5px; flex-shrink: 0;
  border: 1.5px solid var(--border2);
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; color: white; transition: all .12s;
}
.filter-item.active .filter-check { background: var(--p); border-color: var(--p); }

.toolbar {
  display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
  margin-bottom: 16px; padding: 12px 16px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius2);
}
.toolbar-count { font-size: 13px; color: var(--text2); margin-inline-end: auto; }

/* ─── PRICE RANGE ─────────────────────── */
.price-range-wrap { padding: 4px 2px; }
.price-vals { display: flex; justify-content: space-between; font-size: 12px; color: var(--p); font-weight: 600; margin-top: 8px; }
input[type=range] { width: 100%; accent-color: var(--p); cursor: pointer; }

/* ─── CART ─────────────────────────────── */
.cart-wrap { padding: 24px 0 48px; }
.cart-layout { display: grid; grid-template-columns: 1fr 340px; gap: 20px; align-items: start; }
@media (max-width: 900px) { .cart-layout { grid-template-columns: 1fr; } }

.cart-item {
  display: flex; gap: 14px;
  padding: 16px;
  border-bottom: 1px solid var(--border);
}
.cart-item:last-child { border-bottom: none; }
.cart-thumb {
  width: 80px; height: 80px; flex-shrink: 0;
  background: var(--bg2);
  border-radius: var(--radius);
  display: flex; align-items: center; justify-content: center;
  font-size: 36px;
  border: 1px solid var(--border);
}
.cart-info { flex: 1; display: flex; flex-direction: column; gap: 5px; }
.cart-name { font-size: 14px; font-weight: 600; color: var(--text); }
.cart-cat { font-size: 12px; color: var(--text3); }
.cart-row { display: flex; align-items: center; gap: 12px; margin-top: 4px; }

.qty-ctrl { display: flex; align-items: center; border: 1.5px solid var(--border); border-radius: 8px; overflow: hidden; }
.qty-btn { width: 30px; height: 30px; background: none; border: none; color: var(--text2); cursor: pointer; font-size: 16px; transition: background .12s; display: flex; align-items: center; justify-content: center; }
.qty-btn:hover { background: var(--bg2); color: var(--text); }
.qty-val { padding: 0 10px; font-size: 14px; font-weight: 600; min-width: 28px; text-align: center; }

.cart-price { font-size: 15px; font-weight: 700; color: var(--p); }
.remove-btn { font-size: 12px; color: var(--text3); background: none; border: none; cursor: pointer; transition: color .12s; font-family: inherit; }
.remove-btn:hover { color: var(--danger); }

.summary-box {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius2);
  padding: 20px;
  position: sticky; top: calc(var(--nav-h) + 12px);
}
.summary-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; font-size: 14px; }
.summary-row.divider { border-top: 1px solid var(--border); margin-top: 6px; padding-top: 14px; }
.summary-label { color: var(--text2); }
.summary-val { font-weight: 600; color: var(--text); }
.summary-total { font-size: 18px; font-weight: 700; color: var(--p); }

.coupon-row { display: flex; gap: 8px; margin: 12px 0; }
.coupon-row .input { flex: 1; }
.coupon-hint { font-size: 11px; color: var(--text3); margin-top: 4px; }

/* ─── CHECKOUT ────────────────────────── */
.checkout-wrap { padding: 24px 0 48px; }
.checkout-layout { display: grid; grid-template-columns: 1fr 340px; gap: 20px; align-items: start; }
@media (max-width: 900px) { .checkout-layout { grid-template-columns: 1fr; } }

.step-card { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius2); overflow: hidden; margin-bottom: 16px; }
.step-header {
  padding: 16px 20px; display: flex; align-items: center; gap: 12px;
  border-bottom: 1px solid var(--border);
  background: var(--bg2);
}
.step-num {
  width: 28px; height: 28px; border-radius: 8px;
  background: var(--p); color: white;
  font-size: 13px; font-weight: 700;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.step-title { font-size: 15px; font-weight: 700; color: var(--text); }
.step-body { padding: 20px; }

.ship-opt {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 14px; border-radius: var(--radius);
  border: 1.5px solid var(--border);
  cursor: pointer; transition: all .15s; margin-bottom: 8px;
}
.ship-opt:hover { border-color: var(--p); }
.ship-opt.active { border-color: var(--p); background: var(--p-light); }
.radio-circle {
  width: 18px; height: 18px; border-radius: 50%; border: 2px solid var(--border2); flex-shrink: 0;
  display: flex; align-items: center; justify-content: center; transition: border-color .15s;
}
.ship-opt.active .radio-circle { border-color: var(--p); }
.radio-dot { width: 9px; height: 9px; border-radius: 50%; background: var(--p); transform: scale(0); transition: transform .15s; }
.ship-opt.active .radio-dot { transform: scale(1); }
.ship-opt-info { flex: 1; }
.ship-name { font-size: 14px; font-weight: 600; color: var(--text); }
.ship-time { font-size: 12px; color: var(--text3); }
.ship-price { font-size: 14px; font-weight: 700; color: var(--p); }

/* ─── PRODUCT DETAIL ──────────────────── */
.detail-wrap { padding: 24px 0 48px; }
.detail-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 36px; }
@media (max-width: 768px) { .detail-layout { grid-template-columns: 1fr; } }

.detail-main-img {
  aspect-ratio: 1; background: var(--bg2); border-radius: var(--radius2);
  display: flex; align-items: center; justify-content: center;
  font-size: 130px; border: 1px solid var(--border);
  cursor: zoom-in; overflow: hidden;
}
.detail-thumbs { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-top: 10px; }
.thumb-item {
  aspect-ratio: 1; border-radius: var(--radius); background: var(--bg2);
  display: flex; align-items: center; justify-content: center;
  font-size: 28px; border: 2px solid var(--border);
  cursor: pointer; transition: border-color .12s;
}
.thumb-item.active, .thumb-item:hover { border-color: var(--p); }

.detail-name { font-size: clamp(20px, 3vw, 28px); font-weight: 700; color: var(--text); line-height: 1.3; margin-bottom: 10px; }
.detail-price { font-size: 26px; font-weight: 700; color: var(--p); }
.detail-old { font-size: 16px; color: var(--text3); text-decoration: line-through; margin-inline-start: 10px; }
.detail-desc { font-size: 14px; color: var(--text2); line-height: 1.7; margin: 16px 0; }

.spec-list { list-style: none; display: flex; flex-direction: column; gap: 6px; }
.spec-list li { display: flex; align-items: center; gap: 8px; font-size: 14px; color: var(--text2); }
.spec-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--p); flex-shrink: 0; }

.stock-badge {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 13px; font-weight: 600; color: var(--success);
  padding: 4px 10px; background: #DCFCE7; border-radius: 6px;
}
.stock-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--success); animation: blink 1.5s infinite; }
@keyframes blink { 50% { opacity: .3; } }

.qty-wrap { display: flex; align-items: center; gap: 12px; margin: 16px 0; }
.qty-label { font-size: 13px; font-weight: 600; color: var(--text2); }

/* ─── TABS ─────────────────────────────── */
.tabs { display: flex; border-bottom: 2px solid var(--border); margin-bottom: 20px; gap: 0; }
.tab {
  padding: 10px 20px; font-size: 14px; font-weight: 500; color: var(--text2);
  background: none; border: none; cursor: pointer;
  border-bottom: 2px solid transparent; margin-bottom: -2px;
  transition: color .15s, border-color .15s; font-family: inherit;
}
.tab.active { color: var(--p); border-bottom-color: var(--p); font-weight: 700; }
.tab:hover { color: var(--text); }

/* ─── REVIEWS ─────────────────────────── */
.review-item { padding: 16px 0; border-bottom: 1px solid var(--border); }
.review-item:last-child { border-bottom: none; }
.review-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
.review-author { font-weight: 600; font-size: 14px; }
.review-date { font-size: 12px; color: var(--text3); }
.review-text { font-size: 14px; color: var(--text2); line-height: 1.6; }

/* ─── ACCOUNT ─────────────────────────── */
.account-wrap { padding: 24px 0 48px; }
.account-layout { display: grid; grid-template-columns: 220px 1fr; gap: 20px; }
@media (max-width: 768px) { .account-layout { grid-template-columns: 1fr; } }

.account-sidebar-card {
  background: var(--bg); border: 1px solid var(--border);
  border-radius: var(--radius2); overflow: hidden;
  height: fit-content;
  position: sticky; top: calc(var(--nav-h) + 12px);
}
.account-avatar {
  padding: 24px 16px; text-align: center;
  background: linear-gradient(135deg, var(--p), #1E40AF);
  color: white;
}
.avatar-img {
  width: 60px; height: 60px; border-radius: 50%;
  background: rgba(255,255,255,.2); margin: 0 auto 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 24px; border: 2px solid rgba(255,255,255,.3);
}
.avatar-name { font-weight: 700; font-size: 15px; }
.avatar-email { font-size: 12px; opacity: .8; margin-top: 3px; }

.account-nav { padding: 8px; }
.account-nav-item {
  display: flex; align-items: center; gap: 9px;
  padding: 10px 12px; border-radius: var(--radius);
  font-size: 14px; color: var(--text2);
  cursor: pointer; background: none; border: none;
  width: 100%; text-align: start; font-family: inherit;
  transition: all .12s;
}
.account-nav-item:hover { background: var(--bg2); color: var(--text); }
.account-nav-item.active { background: var(--p-light); color: var(--p); font-weight: 600; }

/* ─── ORDERS TABLE ────────────────────── */
.order-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 16px; border-bottom: 1px solid var(--border);
  flex-wrap: wrap; gap: 8px;
}
.order-id { font-weight: 700; font-size: 14px; color: var(--text); }
.order-meta { font-size: 12px; color: var(--text3); margin-top: 2px; }
.status-pill {
  padding: 3px 10px; border-radius: 99px;
  font-size: 12px; font-weight: 600;
}
.status-delivered { background: #DCFCE7; color: #15803D; }
.status-shipped { background: #DBEAFE; color: #1D4ED8; }
.status-confirmed { background: #FEF3C7; color: #92400E; }
.status-pending { background: var(--bg3); color: var(--text2); }

/* ─── ADMIN ────────────────────────────── */
.admin-app {
  display: grid; grid-template-columns: 220px 1fr;
  min-height: 100vh; background: #F8FAFC;
}
[data-theme="dark"] .admin-app { background: #0F172A; }

.admin-sidebar {
  background: var(--bg);
  border-inline-end: 1px solid var(--border);
  display: flex; flex-direction: column;
  position: sticky; top: 0; height: 100vh; overflow-y: auto;
}
.admin-logo {
  padding: 18px 20px;
  border-bottom: 1px solid var(--border);
  display: flex; align-items: center; gap: 10px;
}
.admin-nav { padding: 10px 10px; flex: 1; }
.admin-nav-group { margin-bottom: 4px; }
.admin-nav-label { font-size: 11px; font-weight: 700; color: var(--text3); text-transform: uppercase; letter-spacing: .8px; padding: 12px 10px 6px; }
.admin-nav-item {
  display: flex; align-items: center; gap: 9px;
  padding: 9px 10px; border-radius: var(--radius);
  font-size: 14px; font-weight: 500; color: var(--text2);
  cursor: pointer; background: none; border: none;
  width: 100%; text-align: start; font-family: inherit;
  transition: all .12s;
}
.admin-nav-item:hover { background: var(--bg2); color: var(--text); }
.admin-nav-item.active { background: var(--p-light); color: var(--p); font-weight: 600; }

.admin-main { overflow: auto; }
.admin-header {
  padding: 18px 24px;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;
  position: sticky; top: 0; z-index: 10;
}
.admin-title { font-size: 18px; font-weight: 700; color: var(--text); }
.admin-content { padding: 24px; }

.stat-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px; margin-bottom: 24px; }
.stat-card {
  background: var(--bg); border: 1px solid var(--border);
  border-radius: var(--radius2); padding: 18px;
  display: flex; flex-direction: column; gap: 8px;
}
.stat-card-label { font-size: 12px; font-weight: 600; color: var(--text3); text-transform: uppercase; letter-spacing: .5px; }
.stat-card-val { font-size: 24px; font-weight: 700; color: var(--text); }
.stat-card-change { font-size: 12px; font-weight: 600; color: var(--success); }
.stat-card-icon { font-size: 22px; }

.data-table {
  background: var(--bg); border: 1px solid var(--border);
  border-radius: var(--radius2); overflow: hidden; margin-bottom: 24px;
}
.data-table-header {
  padding: 14px 18px; border-bottom: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;
  background: var(--bg2);
}
.data-table-title { font-size: 14px; font-weight: 700; color: var(--text); }
table { width: 100%; border-collapse: collapse; }
th { text-align: start; padding: 12px 16px; font-size: 12px; font-weight: 700; color: var(--text3); text-transform: uppercase; letter-spacing: .5px; background: var(--bg2); border-bottom: 1px solid var(--border); }
td { padding: 12px 16px; font-size: 13px; color: var(--text); border-bottom: 1px solid var(--border); }
tr:last-child td { border-bottom: none; }
tr:hover td { background: var(--bg2); }
.td-action { display: flex; gap: 6px; }

/* ─── CHART ────────────────────────────── */
.chart-wrap { padding: 10px 0; }
.bar-chart { display: flex; align-items: flex-end; gap: 8px; height: 120px; }
.bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 5px; }
.bar { width: 100%; background: linear-gradient(to top, var(--p-dark), var(--p)); border-radius: 4px 4px 0 0; transition: opacity .2s; min-height: 4px; }
.bar:hover { opacity: .8; }
.bar-lbl { font-size: 11px; color: var(--text3); }

/* ─── CONTACT ──────────────────────────── */
.contact-wrap { padding: 24px 0 48px; }
.contact-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
@media (max-width: 768px) { .contact-layout { grid-template-columns: 1fr; } }
.info-item { display: flex; gap: 12px; padding: 14px; border: 1px solid var(--border); border-radius: var(--radius2); margin-bottom: 10px; transition: border-color .15s; }
.info-item:hover { border-color: var(--p); }
.info-icon { width: 40px; height: 40px; background: var(--p-light); border-radius: var(--radius); display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
.info-label { font-size: 12px; font-weight: 700; color: var(--text3); text-transform: uppercase; letter-spacing: .5px; }
.info-val { font-size: 14px; color: var(--text); margin-top: 2px; }

/* ─── TOAST ────────────────────────────── */
.toast {
  position: fixed; bottom: 20px; inset-inline-end: 20px; z-index: 9999;
  background: var(--text); color: var(--bg);
  padding: 12px 18px; border-radius: var(--radius2);
  font-size: 14px; font-weight: 500;
  box-shadow: var(--shadow-lg);
  display: flex; align-items: center; gap: 9px;
  max-width: 320px;
  animation: slide-up .25s ease;
}
@keyframes slide-up { from { opacity:0; transform: translateY(12px); } to { opacity:1; transform: translateY(0); } }
.toast-icon { font-size: 17px; }

/* ─── PAGE HEADER ──────────────────────── */
.page-header {
  background: var(--bg2);
  border-bottom: 1px solid var(--border);
  padding: 28px 0 20px;
}
.page-title { font-size: 24px; font-weight: 700; color: var(--text); }
.breadcrumb { display: flex; align-items: center; gap: 8px; margin-top: 6px; font-size: 13px; color: var(--text3); flex-wrap: wrap; }
.breadcrumb-link { cursor: pointer; transition: color .12s; }
.breadcrumb-link:hover { color: var(--p); }
.breadcrumb-sep { color: var(--border2); }

/* ─── EMPTY ────────────────────────────── */
.empty { text-align: center; padding: 60px 20px; }
.empty-icon { font-size: 48px; opacity: .3; margin-bottom: 12px; }
.empty-text { font-size: 16px; color: var(--text2); margin-bottom: 20px; }

/* ─── SUCCESS ──────────────────────────── */
.success-wrap { min-height: 70vh; display: flex; align-items: center; justify-content: center; padding: 40px 20px; }
.success-card { text-align: center; max-width: 440px; }
.success-circle {
  width: 72px; height: 72px; border-radius: 50%;
  background: var(--p); color: white;
  font-size: 32px; margin: 0 auto 20px;
  display: flex; align-items: center; justify-content: center;
  animation: pop .4s ease;
}
@keyframes pop { 0%{transform:scale(0)} 70%{transform:scale(1.1)} 100%{transform:scale(1)} }
.success-title { font-size: 22px; font-weight: 700; color: var(--text); margin-bottom: 8px; }
.success-text { font-size: 14px; color: var(--text2); line-height: 1.7; margin-bottom: 24px; }

/* ─── AUTH ─────────────────────────────── */
.auth-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; background: var(--bg2); }
.auth-card { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius2); padding: 36px 32px; width: 100%; max-width: 400px; box-shadow: var(--shadow-lg); }
.auth-logo { text-align: center; margin-bottom: 28px; }
.auth-tabs { display: flex; border: 1.5px solid var(--border); border-radius: var(--radius); overflow: hidden; margin-bottom: 24px; }
.auth-tab { flex: 1; padding: 9px; background: none; border: none; font-size: 14px; font-weight: 500; color: var(--text2); cursor: pointer; transition: all .15s; font-family: inherit; }
.auth-tab.active { background: var(--p); color: white; font-weight: 700; }

/* ─── WISHLIST ─────────────────────────── */
.wish-wrap { padding: 24px 0 48px; }

/* ─── FOOTER ────────────────────────────── */
.footer { background: var(--bg2); border-top: 1px solid var(--border); padding: 44px 0 20px; }
.footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 32px; margin-bottom: 32px; }
@media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 480px) { .footer-grid { grid-template-columns: 1fr; } }
.footer-brand { }
.footer-about { font-size: 13px; color: var(--text2); line-height: 1.7; margin-top: 10px; max-width: 240px; }
.footer-col-title { font-size: 13px; font-weight: 700; color: var(--text); margin-bottom: 14px; }
.footer-links { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.footer-links li button { background: none; border: none; font-size: 13px; color: var(--text2); cursor: pointer; transition: color .12s; font-family: inherit; padding: 0; }
.footer-links li button:hover { color: var(--p); }
.footer-bottom { border-top: 1px solid var(--border); padding-top: 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; }
.footer-copy { font-size: 13px; color: var(--text3); }
.social-row { display: flex; gap: 8px; margin-top: 12px; }
.social-btn { width: 34px; height: 34px; border-radius: var(--radius); border: 1.5px solid var(--border); background: var(--bg); color: var(--text2); display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 14px; transition: all .15s; }
.social-btn:hover { border-color: var(--p); color: var(--p); background: var(--p-light); }

/* ─── NEWSLETTER ──────────────────────── */
.newsletter { background: var(--p); color: white; padding: 44px 0; }
.newsletter-inner { max-width: 500px; margin: 0 auto; text-align: center; }
.newsletter h2 { font-size: 22px; font-weight: 700; margin-bottom: 8px; }
.newsletter p { font-size: 15px; opacity: .85; margin-bottom: 22px; }
.newsletter-form { display: flex; gap: 10px; }
.newsletter-form .input { background: rgba(255,255,255,.15); border-color: rgba(255,255,255,.3); color: white; flex: 1; }
.newsletter-form .input::placeholder { color: rgba(255,255,255,.6); }
.newsletter-form .input:focus { border-color: white; background: rgba(255,255,255,.2); box-shadow: none; }

/* ─── MISC ─────────────────────────────── */
.divider { height: 1px; background: var(--border); margin: 20px 0; }
.text-p { color: var(--p); }
.text-sm { font-size: 13px; }
.text-muted { color: var(--text2); }
.text-xs { font-size: 12px; color: var(--text3); }
.fw-700 { font-weight: 700; }
.mt-auto { margin-top: auto; }
.flex { display: flex; align-items: center; }
.flex-between { display: flex; align-items: center; justify-content: space-between; }
.gap-8 { gap: 8px; }
.gap-12 { gap: 12px; }
.mb-16 { margin-bottom: 16px; }
.mb-8 { margin-bottom: 8px; }
.tag { display: inline-flex; align-items: center; padding: 3px 9px; border-radius: 6px; font-size: 12px; font-weight: 600; background: var(--bg3); color: var(--text2); }
.product-name-modal { direction: rtl; }
.mobile-only { display: none; }
@media (max-width: 768px) {
  .mobile-only { display: flex; }
  .desktop-only { display: none; }
  .nav-links { display: none; }
  .nav-search { display: none; }
  .products-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .hero { padding: 40px 0; }
  .hero h1 { font-size: 26px; }
  .section { padding: 32px 0; }
  .admin-app { grid-template-columns: 1fr; }
  .admin-sidebar { display: none; }
}
`;

// ─── STARS ────────────────────────────────────────────────────────────────────
function Stars({ n = 5 }) {
  return <span className="stars-row">{Array.from({length:5},(_,i) => i<Math.round(n) ? "★" : "☆").join("")}</span>;
}

// ─── TOAST ────────────────────────────────────────────────────────────────────
function Toast({ msg, icon = "✓" }) {
  if (!msg) return null;
  return <div className="toast"><span className="toast-icon">{icon}</span>{msg}</div>;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
function CheckoutPage({ cart, subtotal, discountAmt, discountPct, shippingRates, shipMethod, setShipMethod, showToast, orderDone, setOrderDone, setCart, setDiscountPct, setCouponCode, isLoggedIn, nav }) {
  const [cname, setCname]     = useState("");
  const [cphone, setCphone]   = useState("");
  const [wCode, setWCode]     = useState("");
  const [ccommune, setCcommune] = useState("");
  const [caddress, setCaddress] = useState("");
  const [communes, setCommunes] = useState([]);
  const [curRate, setCurRate] = useState(null);
  const [cerrs, setCerrs]     = useState({});

  useEffect(() => {
    if (!wCode) { setCommunes([]); setCcommune(""); setCurRate(null); return; }
    const found = WILAYAS.find(x => x.code === wCode);
    setCommunes(found ? found.communes : []);
    setCcommune("");
    const num = parseInt(wCode, 10);
    const rate = shippingRates.find(r => r.id === num);
    setCurRate(rate || null);
  }, [wCode, shippingRates]);

  const shipCost = curRate
    ? (shipMethod === "bureau" && curRate.bureau ? curRate.bureau : curRate.domicile)
    : 0;
  const finalTotal = subtotal - discountAmt + shipCost;

  const doSubmit = () => {
    const e = {};
    if (!cname.trim())    e.cname    = "الاسم مطلوب";
    if (!cphone.trim())   e.cphone   = "رقم الهاتف مطلوب";
    else if (!/^0[5-7]\d{8}$/.test(cphone.trim())) e.cphone = "رقم غير صحيح (0555xxxxxxx)";
    if (!wCode)           e.wCode    = "اختر الولاية";
    if (!ccommune)        e.ccommune = "اختر البلدية";
    if (!caddress.trim()) e.caddress = "العنوان مطلوب";
    if (Object.keys(e).length) { setCerrs(e); showToast("يرجى إكمال البيانات","⚠"); return; }
    // حفظ الطلب في Supabase
    const wilayaName = WILAYAS.find(w => w.code === wCode)?.name || wCode;
    await saveOrderToSupabase({
      name: cname, phone: cphone,
      wilaya: wilayaName, commune: ccommune, address: caddress,
      shipMethod, shipCost,
      subtotal, discountPct, discountAmt,
      total: subtotal - discountAmt + shipCost,
      couponCode: ""
    }, cart);
    setOrderDone(true); setCart([]); setDiscountPct(0); setCouponCode("");
  };

  if (orderDone) return (
    <div className="success-wrap">
      <div className="success-card">
        <div className="success-circle">✓</div>
        <div className="success-title">تم تأكيد طلبك! 🎉</div>
        <div className="success-text">شكراً {cname}! سنتصل بك على {cphone} لتأكيد التوصيل.</div>
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginTop:16}}>
          <button className="btn btn-primary" onClick={()=>nav("shop")}>مواصلة التسوق</button>
          {isLoggedIn && <button className="btn btn-secondary" onClick={()=>nav("account")}>تتبع الطلب</button>}
        </div>
      </div>
    </div>
  );

  const wName = WILAYAS.find(w => w.code === wCode)?.name || "";

  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="page-title">إتمام الشراء</div>
          <div className="breadcrumb">
            <span className="breadcrumb-link" onClick={()=>nav("home")}>الرئيسية</span>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-link" onClick={()=>nav("cart")}>السلة</span>
            <span className="breadcrumb-sep">/</span>
            <span>إتمام الشراء</span>
          </div>
        </div>
      </div>
      <div className="checkout-wrap">
        <div className="container">
          <div className="checkout-layout">
            <div>

              {/* ── خطوة 1 ── */}
              <div className="step-card">
                <div className="step-header"><div className="step-num">1</div><div className="step-title">بيانات المستلم</div></div>
                <div className="step-body">
                  <div className="grid-2">
                    <div className="field">
                      <label className="label">الاسم الكامل *</label>
                      <input className={`input ${cerrs.cname?"error":""}`} placeholder="أحمد بن سالم"
                        value={cname} onChange={e=>{setCname(e.target.value); setCerrs(p=>({...p,cname:""}));}} />
                      {cerrs.cname && <div className="err-msg">{cerrs.cname}</div>}
                    </div>
                    <div className="field">
                      <label className="label">رقم الهاتف *</label>
                      <input className={`input ${cerrs.cphone?"error":""}`} placeholder="0555 123 456" dir="ltr"
                        value={cphone} onChange={e=>{setCphone(e.target.value); setCerrs(p=>({...p,cphone:""}));}} />
                      {cerrs.cphone && <div className="err-msg">{cerrs.cphone}</div>}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── خطوة 2 ── */}
              <div className="step-card">
                <div className="step-header"><div className="step-num">2</div><div className="step-title">عنوان التوصيل</div></div>
                <div className="step-body">
                  <div className="grid-2">
                    <div className="field">
                      <label className="label">الولاية * ({WILAYAS.length})</label>
                      <select className={`select ${cerrs.wCode?"error":""}`}
                        value={wCode}
                        onChange={e=>{ setWCode(e.target.value); setCerrs(p=>({...p,wCode:""})); }}>
                        <option value="">-- اختر الولاية --</option>
                        {WILAYAS.map(w=>(
                          <option key={w.code} value={w.code}>{w.code} — {w.name}</option>
                        ))}
                      </select>
                      {cerrs.wCode && <div className="err-msg">{cerrs.wCode}</div>}
                    </div>
                    <div className="field">
                      <label className="label">البلدية *</label>
                      <select className={`select ${cerrs.ccommune?"error":""}`}
                        key={"comm-"+wCode}
                        value={ccommune}
                        onChange={e=>{ setCcommune(e.target.value); setCerrs(p=>({...p,ccommune:""})); }}>
                        <option value="">{wCode ? "-- اختر البلدية --" : "اختر الولاية أولاً"}</option>
                        {communes.map(c=>(
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      {cerrs.ccommune && <div className="err-msg">{cerrs.ccommune}</div>}
                    </div>
                  </div>
                  <div className="field" style={{marginTop:14}}>
                    <label className="label">العنوان التفصيلي *</label>
                    <input className={`input ${cerrs.caddress?"error":""}`}
                      placeholder="شارع الاستقلال، حي النصر..."
                      value={caddress} onChange={e=>{setCaddress(e.target.value); setCerrs(p=>({...p,caddress:""}));}} />
                    {cerrs.caddress && <div className="err-msg">{cerrs.caddress}</div>}
                  </div>
                  {wCode && ccommune && (
                    <div style={{marginTop:10,padding:"9px 13px",background:"var(--bg2)",borderRadius:"var(--radius)",fontSize:13,color:"var(--text2)"}}>
                      📍 ولاية {wName}، بلدية {ccommune}
                    </div>
                  )}
                </div>
              </div>

              {/* ── خطوة 3: الشحن ── */}
              <div className="step-card">
                <div className="step-header"><div className="step-num">3</div><div className="step-title">طريقة الشحن</div></div>
                <div className="step-body">
                  {!curRate ? (
                    <div style={{padding:"12px",background:"#FEF3C7",borderRadius:8,border:"1px solid #FCD34D",fontSize:13,color:"#92400E"}}>
                      ⚠ اختر الولاية أولاً لعرض أسعار الشحن
                    </div>
                  ) : (
                    <>
                      <div style={{padding:"9px 12px",background:"var(--bg3)",borderRadius:8,marginBottom:12,fontSize:13}}>
                        📍 <strong>{wName}</strong> — المدة: <strong>{curRate.delay}</strong>
                      </div>
                      <div className={`ship-opt ${shipMethod==="domicile"?"active":""}`} onClick={()=>setShipMethod("domicile")}>
                        <div className="radio-circle"><div className="radio-dot"/></div>
                        <div className="ship-opt-info">
                          <div className="ship-name">🏠 توصيل للمنزل</div>
                          <div className="ship-time">⏱ {curRate.delay}</div>
                        </div>
                        <span className="ship-price">{FMT(curRate.domicile)}</span>
                      </div>
                      {curRate.bureau && (
                        <div className={`ship-opt ${shipMethod==="bureau"?"active":""}`} onClick={()=>setShipMethod("bureau")}>
                          <div className="radio-circle"><div className="radio-dot"/></div>
                          <div className="ship-opt-info">
                            <div className="ship-name">🏢 استلام من مكتب</div>
                            <div className="ship-time">⏱ {curRate.delay}</div>
                          </div>
                          <span className="ship-price">{FMT(curRate.bureau)}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* ── خطوة 4: الدفع ── */}
              <div className="step-card">
                <div className="step-header"><div className="step-num">4</div><div className="step-title">طريقة الدفع</div></div>
                <div className="step-body">
                  <div className="ship-opt active">
                    <div className="radio-circle"><div className="radio-dot"/></div>
                    <span style={{fontSize:22}}>💵</span>
                    <div className="ship-opt-info">
                      <div className="ship-name">الدفع عند الاستلام (COD)</div>
                      <div className="ship-time">ادفع نقداً عند تسلم طلبك</div>
                    </div>
                  </div>
                  <div className="ship-opt" style={{opacity:.5,cursor:"not-allowed"}}>
                    <div className="radio-circle"/>
                    <span style={{fontSize:22}}>💳</span>
                    <div className="ship-opt-info">
                      <div className="ship-name">دفع إلكتروني</div>
                      <div className="ship-time">CIB / Dahabia — قريباً</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>{/* end left col */}

            {/* ── ملخص ── */}
            <div>
              <div className="summary-box">
                <div style={{fontSize:16,fontWeight:700,marginBottom:16}}>ملخص الطلب</div>
                {cart.map(item=>(
                  <div key={item.id} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",fontSize:13,borderBottom:"1px solid var(--border)"}}>
                    <span style={{color:"var(--text2)"}}>{item.name} × {item.qty}</span>
                    <span style={{fontWeight:600}}>{FMT(item.price * item.qty)}</span>
                  </div>
                ))}
                <div className="summary-row" style={{marginTop:8}}>
                  <span className="summary-label">المجموع الفرعي</span>
                  <span className="summary-val">{FMT(subtotal)}</span>
                </div>
                {discountPct > 0 && (
                  <div className="summary-row">
                    <span className="summary-label">الخصم ({discountPct}%)</span>
                    <span style={{color:"var(--danger)",fontWeight:600}}>- {FMT(discountAmt)}</span>
                  </div>
                )}
                <div className="summary-row">
                  <span className="summary-label">الشحن</span>
                  <span className="summary-val">{curRate ? FMT(shipCost) : "يُحدَّد بعد اختيار الولاية"}</span>
                </div>
                <div className="divider"/>
                <div className="summary-row">
                  <span style={{fontWeight:700,fontSize:15}}>الإجمالي</span>
                  <span className="summary-total">{FMT(finalTotal)}</span>
                </div>
                <button className="btn btn-primary btn-full btn-lg" style={{marginTop:16}} onClick={doSubmit}>
                  ✓ تأكيد الطلب
                </button>
                <div style={{textAlign:"center",fontSize:12,color:"var(--text3)",marginTop:12}}>🔒 بياناتك آمنة ومحمية</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default function WinkStore() {
  const [theme, setTheme] = useState("light");
  const [page, setPage] = useState("home");
  const [selectedProd, setSelectedProd] = useState(null);
  const [cart, setCart] = useState([
    { ...PRODUCTS[0], qty: 1 },
    { ...PRODUCTS[4], qty: 2 },
  ]);
  const [wishlist, setWishlist] = useState([2, 5]);
  const [toast, setToast] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [adminTab, setAdminTab] = useState("dashboard");
  const [accountTab, setAccountTab] = useState("orders");
  const [orderDone, setOrderDone] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountPct, setDiscountPct] = useState(0);
  const [detailTab, setDetailTab] = useState("desc");
  const [detailQty, setDetailQty] = useState(1);
  const [coupons, setCoupons] = useState({"WINK10":10,"WELCOME20":20,"DZ30":30});
  // Shop filters
  const [shopSearch, setShopSearch] = useState("");
  const [activeCat, setActiveCat] = useState(0);
  const [maxPrice, setMaxPrice] = useState(70000);
  const [sortBy, setSortBy] = useState("new");
  // Checkout
  const [wilaya, setWilaya] = useState("");
  const [commune, setCommune] = useState("");
  const [shipMethod, setShipMethod] = useState("domicile");
  const [selectedWilayaId, setSelectedWilayaId] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  // Product management modal
  const [editingProd, setEditingProd] = useState(null);
  const [products, setProducts] = useState(PRODUCTS);

  const [dbLoading, setDbLoading] = useState(true);
  const [dbConnected, setDbConnected] = useState(false);

  // ─── SUPABASE: تحميل البيانات عند البدء ────────────────────────────────
  useEffect(() => { loadFromSupabase(); }, []);

  const loadFromSupabase = async () => {
    try {
      setDbLoading(true);
      // المنتجات
      const { data: prods } = await supabase
        .from("products")
        .select("*, product_images(*), product_variants(*)")
        .eq("is_active", true)
        .order("created_at", { ascending: false });
      if (prods && prods.length > 0) {
        setProducts(prods.map(p => ({
          id: p.id, name: p.name, desc: p.description || "",
          price: p.price, oldPrice: p.old_price || null,
          cat: p.category_id, tags: p.tags || [], specs: p.specs || [],
          rating: parseFloat(p.rating) || 4.5, reviews: p.reviews || 0, emoji: "📦",
          images: (p.product_images||[]).sort((a,b)=>a.sort_order-b.sort_order).map(i=>({data:i.url,name:i.url})),
          variants: (p.product_variants||[]).sort((a,b)=>a.sort_order-b.sort_order).map(v=>({label:v.label,price:v.price,description:v.description||"",image:v.image_url||""})),
        })));
      }
      // أسعار الشحن
      const { data: rates } = await supabase.from("shipping_rates").select("*").order("id");
      if (rates && rates.length > 0) setShippingRates(rates.map(r=>({id:r.id,name:r.name,delay:r.delay,domicile:r.domicile,bureau:r.bureau})));
      // الكوبونات
      const { data: cpns } = await supabase.from("coupons").select("*").eq("is_active", true);
      if (cpns && cpns.length > 0) { const m={}; cpns.forEach(c=>{m[c.code]=c.discount;}); setCoupons(m); }
      setDbConnected(true);
    } catch(err) {
      console.warn("Supabase غير متاح، يعمل بالبيانات المحلية"); setDbConnected(false);
    } finally { setDbLoading(false); }
  };

  // ─── SUPABASE: حفظ طلب ──────────────────────────────────────────────────
  const saveOrderToSupabase = async (od, cartItems) => {
    try {
      const { data: cust } = await supabase.from("customers").insert({name:od.name,phone:od.phone,wilaya:od.wilaya,commune:od.commune,address:od.address}).select().single();
      const { data: order } = await supabase.from("orders").insert({customer_id:cust?.id||null,customer_name:od.name,customer_phone:od.phone,wilaya:od.wilaya,commune:od.commune,address:od.address,ship_method:od.shipMethod,ship_cost:od.shipCost,subtotal:od.subtotal,discount_pct:od.discountPct,discount_amt:od.discountAmt,total:od.total,coupon_code:od.couponCode||null,status:"pending"}).select().single();
      if (order) await supabase.from("order_items").insert(cartItems.map(i=>({order_id:order.id,product_id:i.id,product_name:i.name,variant:i.selectedVariant||null,price:i.price,qty:i.qty,total:i.price*i.qty})));
      return order?.id || null;
    } catch(err) { console.warn("خطأ في حفظ الطلب:", err.message); return null; }
  };

  // ─── SUPABASE: رفع صورة ─────────────────────────────────────────────────
  const uploadImageToSupabase = async (file, prodId) => {
    try {
      const path = `products/${prodId}_${Date.now()}.${file.name.split(".").pop()}`;
      const { error } = await supabase.storage.from("product-images").upload(path, file, {upsert:true});
      if (error) throw error;
      return supabase.storage.from("product-images").getPublicUrl(path).data.publicUrl;
    } catch(err) { console.warn("خطأ في رفع الصورة:", err.message); return null; }
  };

  // ─── SUPABASE: حفظ منتج ─────────────────────────────────────────────────
  const saveProductToSupabase = async (prod, imageFiles, variants) => {
    try {
      const { data: np } = await supabase.from("products").insert({name:prod.name,description:prod.desc,price:prod.price,old_price:prod.oldPrice||null,category_id:prod.cat,tags:prod.tags,specs:prod.specs||[],is_active:true}).select().single();
      if (!np) return null;
      for (let i=0; i<imageFiles.length; i++) {
        const file = imageFiles[i];
        if (file.data && file.data.startsWith("data:")) {
          const blob = await (await fetch(file.data)).blob();
          const f = new File([blob], file.name||`img${i}.jpg`, {type:blob.type});
          const url = await uploadImageToSupabase(f, np.id);
          if (url) await supabase.from("product_images").insert({product_id:np.id,url,is_main:i===0,sort_order:i});
        }
      }
      for (let i=0; i<variants.length; i++) {
        const v = variants[i]; if (!v.label) continue;
        await supabase.from("product_variants").insert({product_id:np.id,label:v.label,price:parseInt(v.price)||prod.price,description:v.description||"",sort_order:i});
      }
      return np.id;
    } catch(err) { console.warn("خطأ في حفظ المنتج:", err.message); return null; }
  };

  // ─── SUPABASE: حذف منتج ─────────────────────────────────────────────────
  const deleteProductFromSupabase = async (id) => {
    try { await supabase.from("products").update({is_active:false}).eq("id",id); } catch(err) {}
  };

  // ─── SUPABASE: حفظ أسعار الشحن ──────────────────────────────────────────
  const saveShippingRatesToSupabase = async (rates) => {
    try {
      for (const r of rates) await supabase.from("shipping_rates").update({domicile:r.domicile,bureau:r.bureau}).eq("id",r.id);
      return true;
    } catch { return false; }
  };

  // ─── SUPABASE: إدارة الكوبونات ───────────────────────────────────────────
  const addCouponToSupabase = async (code, discount) => {
    try { const {error} = await supabase.from("coupons").upsert({code:code.toUpperCase(),discount,is_active:true}); return !error; } catch { return false; }
  };
  const deleteCouponFromSupabase = async (code) => {
    try { await supabase.from("coupons").update({is_active:false}).eq("code",code); return true; } catch { return false; }
  };

  const [shippingRates, setShippingRates] = useState(SHIPPING_RATES);

  const showToast = useCallback((msg, icon = "✓") => {
    setToast({ msg, icon });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const nav = (p, prod = null) => {
    setPage(p);
    setSelectedProd(prod);
    setOrderDone(false);
    setDetailTab("desc");
    setDetailQty(1);
    window.scrollTo(0, 0);
  };

  const addCart = (prod, qty = 1) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === prod.id);
      if (ex) return prev.map(i => i.id === prod.id ? {...i, qty: i.qty + qty} : i);
      return [...prev, {...prod, qty}];
    });
    showToast("تمت الإضافة إلى السلة", "🛒");
  };

  const removeCart = id => setCart(p => p.filter(i => i.id !== id));
  const updateQty = (id, d) => setCart(p => p.map(i => i.id === id ? {...i, qty: Math.max(1, i.qty + d)} : i));
  const toggleWish = id => setWishlist(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const subtotal = cart.reduce((a, i) => a + i.price * i.qty, 0);
  const discountAmt = Math.round(subtotal * discountPct / 100);
  
  // Get shipping cost based on selected wilaya
  const getShippingCost = () => {
    if (!selectedWilayaId) return 0;
    const rate = shippingRates.find(r => r.id === selectedWilayaId);
    if (!rate) return 0;
    if (shipMethod === "bureau") return rate.bureau || rate.domicile;
    return rate.domicile;
  };
  
  const shipping = getShippingCost();
  const total = subtotal - discountAmt + shipping;
  const cartCount = cart.reduce((a, i) => a + i.qty, 0);

  const applyCoupon = () => {
    const key = couponCode.trim().toUpperCase();
    if (coupons[key]) { setDiscountPct(coupons[key]); showToast(`تم تطبيق الكوبون: خصم ${coupons[key]}%`, "🏷"); }
    else showToast("الكوبون غير صالح", "✕");
  };

  const selectedWilaya = WILAYAS.find(w => w.code === wilaya);
  const communes = selectedWilaya?.communes || [];

  const validateCheckout = (data) => {
    const errs = {};
    if (!data.name?.trim()) errs.name = "الاسم مطلوب";
    if (!data.phone?.trim()) errs.phone = "رقم الهاتف مطلوب";
    else if (!/^0[5-7]\d{8}$/.test(data.phone.trim())) errs.phone = "رقم الهاتف غير صحيح (مثال: 0555123456)";
    if (!data.wilaya) errs.wilaya = "اختر الولاية";
    if (!data.commune) errs.commune = "اختر البلدية";
    if (!data.address?.trim()) errs.address = "العنوان مطلوب";
    return errs;
  };

  // ─── LOGO ────────────────────────────────────────────────────────────────────
  const Logo = ({ size = "md" }) => (
    <div className="nav-logo" onClick={() => nav("home")}>
      <div className="logo-mark" style={size === "lg" ? {width:48,height:48,fontSize:22,borderRadius:12} : {}}>W</div>
      <span className="logo-text" style={size === "lg" ? {fontSize:22} : {}}>Wink <span>Store</span></span>
    </div>
  );

  // ─── NAVBAR ──────────────────────────────────────────────────────────────────
  const Navbar = () => (
    <nav className="nav">
      <div className="nav-inner">
        <Logo />
        <div className="nav-search desktop-only">
          <input
            className="input"
            placeholder="ابحث عن منتج..."
            style={{background:"var(--bg2)"}}
            onChange={e => { setShopSearch(e.target.value); }}
          />
          <span className="nav-search-icon">⌕</span>
        </div>
        <div className="nav-links desktop-only">
          {[["home","الرئيسية"],["shop","المتجر"],["contact","تواصل معنا"]].map(([p,l]) => (
            <button key={p} className={`nav-link ${page === p ? "active" : ""}`} onClick={() => nav(p)}>{l}</button>
          ))}
        </div>
        <div className="nav-actions">
          <button className="nav-btn" onClick={() => setTheme(t => t==="dark" ? "light" : "dark")} title="تبديل المظهر">
            {theme === "dark" ? "☀" : "◑"}
          </button>
          <button className="nav-btn" onClick={() => nav("wishlist")}>
            ♡ {wishlist.length > 0 && <span className="badge" style={{background:"var(--danger)"}}>{wishlist.length}</span>}
          </button>
          <button className="nav-btn" onClick={() => nav("cart")}>
            🛒 {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>
          <button className="nav-btn" onClick={() => nav(isLoggedIn ? "account" : "auth")}>
            👤
          </button>
          <a className="nav-btn" style={{background:"#25D366",borderColor:"#25D366",color:"white",textDecoration:"none"}} href="https://wa.me/213664074880" target="_blank" rel="noopener noreferrer">📱</a>
          <button className="btn btn-secondary btn-sm" style={{fontSize:12}} onClick={() => nav("admin")}>⚙</button>
        </div>
      </div>
    </nav>
  );

  // ─── PRODUCT CARD ────────────────────────────────────────────────────────────
  const ProductCard = ({ p }) => {
    const cat = CATEGORIES.find(c => c.id === p.cat);
    const save = p.oldPrice ? Math.round((1 - p.price/p.oldPrice)*100) : 0;
    const inWish = wishlist.includes(p.id);
    const [imgIdx, setImgIdx] = useState(0);
    const images = p.images && p.images.length > 0 ? p.images : [];
    const hasMultiple = images.length > 1;
    const lowestVariantPrice = p.variants && p.variants.length > 1
      ? Math.min(...p.variants.map(v => v.price || p.price))
      : p.price;

    const prevImg = (e) => {
      e.stopPropagation();
      setImgIdx(i => (i - 1 + images.length) % images.length);
    };
    const nextImg = (e) => {
      e.stopPropagation();
      setImgIdx(i => (i + 1) % images.length);
    };

    return (
      <div className="product-card">
        <div className="product-img" style={{position:"relative",overflow:"hidden",background:"var(--bg2)"}}>
          {/* Image */}
          <div onClick={() => nav("product", p)} style={{width:"100%",height:"100%",cursor:"pointer"}}>
            {images.length > 0 ? (
              <img src={images[imgIdx].data} alt={p.name}
                style={{width:"100%",height:"100%",objectFit:"cover",display:"block",transition:"opacity .2s"}} />
            ) : (
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",color:"var(--text3)"}}>
                <span style={{fontSize:36}}>📷</span>
                <span style={{fontSize:11,marginTop:6}}>لا توجد صورة</span>
              </div>
            )}
          </div>

          {/* Prev/Next arrows */}
          {hasMultiple && (
            <>
              <button onClick={prevImg} style={{
                position:"absolute",top:"50%",right:6,transform:"translateY(-50%)",
                width:28,height:28,borderRadius:"50%",background:"rgba(0,0,0,.45)",
                color:"#fff",border:"none",cursor:"pointer",fontSize:14,
                display:"flex",alignItems:"center",justifyContent:"center",zIndex:3
              }}>‹</button>
              <button onClick={nextImg} style={{
                position:"absolute",top:"50%",left:6,transform:"translateY(-50%)",
                width:28,height:28,borderRadius:"50%",background:"rgba(0,0,0,.45)",
                color:"#fff",border:"none",cursor:"pointer",fontSize:14,
                display:"flex",alignItems:"center",justifyContent:"center",zIndex:3
              }}>›</button>
              {/* Dots */}
              <div style={{position:"absolute",bottom:7,left:"50%",transform:"translateX(-50%)",display:"flex",gap:4,zIndex:3}}>
                {images.map((_,i) => (
                  <span key={i} onClick={e=>{e.stopPropagation();setImgIdx(i);}} style={{
                    width: i===imgIdx?16:6, height:6, borderRadius:99,
                    background: i===imgIdx?"#fff":"rgba(255,255,255,.5)",
                    cursor:"pointer", transition:"all .2s", display:"block"
                  }}/>
                ))}
              </div>
            </>
          )}

          {/* Badges */}
          {p.oldPrice && <span className="p-badge badge-sale">-{save}%</span>}
          {!p.oldPrice && <span className="p-badge badge-new">جديد</span>}

          {/* Wishlist + Cart quick buttons */}
          <div className="product-img-actions">
            <button className={`img-action-btn ${inWish?"wishlisted":""}`}
              onClick={e=>{e.stopPropagation();toggleWish(p.id);}} title="المفضلة">♡</button>
            <button className="img-action-btn"
              onClick={e=>{e.stopPropagation();addCart(p);}} title="أضف للسلة">🛒</button>
          </div>
        </div>

        <div className="product-body" onClick={() => nav("product", p)}>
          <div className="product-cat">{cat?.name}</div>
          <div className="product-name">{p.name}</div>
          <div className="product-rating"><Stars n={p.rating}/><span className="rating-count">({p.reviews})</span></div>
          {p.variants && p.variants.length > 1 && (
            <div style={{fontSize:11,color:"var(--text3)",marginTop:4}}>
              {p.variants.length} موديلات — من {FMT(lowestVariantPrice)}
            </div>
          )}
          <div className="product-price">
            <span className="price-main">{FMT(p.price)}</span>
            {p.oldPrice && <><span className="price-old">{FMT(p.oldPrice)}</span><span className="price-save">-{save}%</span></>}
          </div>
        </div>
        <div className="product-add-row" style={{display:"flex",gap:6,padding:"10px 14px"}}>
          <button className="btn btn-primary btn-sm" style={{flex:1}} onClick={()=>{addCart(p); nav("checkout");}}>شراء الآن</button>
          <button className="btn btn-secondary btn-sm" style={{flex:1}} onClick={()=>addCart(p)}>+ السلة</button>
        </div>
      </div>
    );
  };

  // ─── HOME ────────────────────────────────────────────────────────────────────
  const HomePage = () => (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-badge">✦ مجموعة 2025 الحصرية</div>
          <h1>اطلب بسهولة،<br />استلم بسرعة 🚀</h1>
          <p>تسوّق من أفضل المنتجات بأسعار مناسبة مع توصيل سريع لجميع ولايات الجزائر</p>
          <div className="hero-actions">
            <button className="btn btn-white btn-lg" onClick={() => nav("shop")}>تسوق الآن</button>
            <button className="btn btn-outline-white btn-lg" onClick={() => nav("contact")}>تواصل معنا</button>
          </div>
          <div className="hero-stats">
            <div className="stat-block"><span className="stat-num">+5,000</span><span className="stat-lbl">عميل راضٍ</span></div>
            <div className="stat-block"><span className="stat-num">58</span><span className="stat-lbl">ولاية نوصّل لها</span></div>
            <div className="stat-block"><span className="stat-num">+200</span><span className="stat-lbl">منتج متوفر</span></div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <div style={{background:"var(--bg)"}}>
        <div className="section container">
          <div className="section-head">
            <div>
              <div className="section-title">تسوق حسب الفئة</div>
              <div className="section-sub">اكتشف تشكيلة واسعة من المنتجات</div>
            </div>
          </div>
          <div className="cats-grid">
            {CATEGORIES.map(c => (
              <div key={c.id} className="cat-card" onClick={() => { setActiveCat(c.id); nav("shop"); }}>
                <span className="cat-icon">{c.icon}</span>
                <span className="cat-name">{c.name}</span>
                <span className="cat-count">{c.count} منتج</span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured */}
        <div className="section container" style={{paddingTop:0}}>
          <div className="section-head">
            <div><div className="section-title">منتجات مميزة</div></div>
            <button className="btn btn-ghost btn-sm" onClick={() => nav("shop")}>عرض الكل ←</button>
          </div>
          <div className="products-grid">
            {products.slice(0,4).map(p => <ProductCard key={p.id} p={p} />)}
          </div>
        </div>

        {/* Best Sellers */}
        <div className="section" style={{background:"var(--bg2)",paddingTop:40,paddingBottom:40}}>
          <div className="container">
            <div className="section-head">
              <div><div className="section-title">الأكثر مبيعاً 🔥</div></div>
              <button className="btn btn-ghost btn-sm" onClick={() => nav("shop")}>عرض الكل ←</button>
            </div>
            <div className="products-grid">
              {products.slice(1,5).map(p => <ProductCard key={p.id} p={p} />)}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="section container">
          <div className="section-head">
            <div><div className="section-title">آراء عملائنا ⭐</div></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:16}}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="card card-pad" style={{display:"flex",flexDirection:"column",gap:12}}>
                <Stars n={t.rating} />
                <p style={{fontSize:14,color:"var(--text2)",lineHeight:1.7,fontStyle:"italic"}}>"{t.text}"</p>
                <div style={{display:"flex",alignItems:"center",gap:10,marginTop:"auto"}}>
                  <div style={{width:36,height:36,borderRadius:"50%",background:"var(--p-light)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,color:"var(--p)",fontWeight:700}}>{t.name[0]}</div>
                  <div>
                    <div style={{fontSize:13,fontWeight:700,color:"var(--text)"}}>{t.name}</div>
                    <div style={{fontSize:12,color:"var(--text3)"}}>{t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="newsletter">
          <div className="newsletter-inner container-sm">
            <h2>اشترك في نشرتنا البريدية 📧</h2>
            <p>احصل على أحدث العروض والمنتجات الجديدة مباشرة في بريدك</p>
            <div className="newsletter-form">
              <input className="input" placeholder="بريدك الإلكتروني..." type="email" />
              <button className="btn btn-white" onClick={() => showToast("تم الاشتراك بنجاح!", "✉")}>اشترك</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // ─── SHOP ────────────────────────────────────────────────────────────────────
  const ShopPage = () => {
    const filtered = products
      .filter(p => activeCat === 0 || p.cat === activeCat)
      .filter(p => p.price <= maxPrice)
      .filter(p => p.name.includes(shopSearch) || shopSearch === "")
      .sort((a, b) => sortBy === "price-asc" ? a.price - b.price : sortBy === "price-desc" ? b.price - a.price : sortBy === "rating" ? b.rating - a.rating : b.id - a.id);

    return (
      <>
        <div className="page-header">
          <div className="container">
            <div className="page-title">المتجر</div>
            <div className="breadcrumb">
              <span className="breadcrumb-link" onClick={() => nav("home")}>الرئيسية</span>
              <span className="breadcrumb-sep">/</span>
              <span>المتجر</span>
            </div>
          </div>
        </div>
        <div className="shop-wrap">
          <div className="container">
            <div className="shop-layout">
              {/* Sidebar */}
              <div className="sidebar">
                <div className="sidebar-section">
                  <div className="sidebar-title">التصنيفات</div>
                  <button className={`filter-item ${activeCat===0?"active":""}`} onClick={()=>setActiveCat(0)}>
                    <span className={`filter-check ${activeCat===0?"active":""}`}>{activeCat===0?"✓":""}</span>
                    كل المنتجات ({products.length})
                  </button>
                  {CATEGORIES.map(c => (
                    <button key={c.id} className={`filter-item ${activeCat===c.id?"active":""}`} onClick={()=>setActiveCat(c.id)}>
                      <span className={`filter-check ${activeCat===c.id?"active":""}`}>{activeCat===c.id?"✓":""}</span>
                      {c.icon} {c.name} ({products.filter(p=>p.cat===c.id).length})
                    </button>
                  ))}
                </div>
                <div className="sidebar-section">
                  <div className="sidebar-title">نطاق السعر</div>
                  <div className="price-range-wrap">
                    <input type="range" min="500" max="70000" step="500" value={maxPrice} onChange={e=>setMaxPrice(+e.target.value)} />
                    <div className="price-vals">
                      <span>0 دج</span>
                      <span>{FMT(maxPrice)}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="sidebar-title">فرز حسب</div>
                  {[["new","الأحدث"],["price-asc","السعر: الأقل"],["price-desc","السعر: الأعلى"],["rating","التقييم"]].map(([v,l]) => (
                    <button key={v} className={`filter-item ${sortBy===v?"active":""}`} onClick={()=>setSortBy(v)}>
                      <span className={`filter-check ${sortBy===v?"active":""}`}>{sortBy===v?"✓":""}</span>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              {/* Main */}
              <div>
                <div className="toolbar">
                  <div style={{display:"flex",alignItems:"center",gap:8,flex:1}}>
                    <span style={{color:"var(--text3)",fontSize:15}}>⌕</span>
                    <input className="input" style={{border:"none",background:"none",outline:"none",padding:"4px 0",fontSize:14}} placeholder="ابحث عن منتج..." value={shopSearch} onChange={e=>setShopSearch(e.target.value)} />
                  </div>
                  <span className="toolbar-count">{filtered.length} منتج</span>
                </div>
                {filtered.length > 0 ? (
                  <div className="products-grid">{filtered.map(p => <ProductCard key={p.id} p={p} />)}</div>
                ) : (
                  <div className="empty">
                    <div className="empty-icon">🔍</div>
                    <div className="empty-text">لا توجد منتجات مطابقة</div>
                    <button className="btn btn-primary" onClick={()=>{setActiveCat(0);setShopSearch("");}}>إعادة ضبط الفلتر</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // ─── PRODUCT DETAIL ──────────────────────────────────────────────────────────
  const ProductDetailPage = () => {
    if (!selectedProd) return null;
    const p = selectedProd;
    const cat = CATEGORIES.find(c => c.id === p.cat);
    const related = products.filter(r => r.cat === p.cat && r.id !== p.id).slice(0,4);
    const inWish = wishlist.includes(p.id);
    const save = p.oldPrice ? Math.round((1 - p.price/p.oldPrice)*100) : 0;
    const [selImgIdx, setSelImgIdx] = useState(0);
    const [selVarIdx, setSelVarIdx] = useState(0);

    const images = p.images && p.images.length > 0 ? p.images : [];
    const curVariant = p.variants && p.variants.length > 0 ? p.variants[selVarIdx] : null;
    const curPrice = curVariant?.price || p.price;

    const sampleReviews = [
      {author:"أمينة ب.", rating:5, date:"15 يناير 2025", text:"منتج ممتاز وجودة أكثر مما توقعت! التوصيل كان في الموعد."},
      {author:"كريم م.", rating:4, date:"3 فبراير 2025", text:"راضٍ جداً عن المنتج. السعر مناسب والجودة جيدة. سأشتري مجدداً."},
    ];

    return (
      <>
        <div className="page-header">
          <div className="container">
            <div className="page-title">{p.name}</div>
            <div className="breadcrumb">
              <span className="breadcrumb-link" onClick={()=>nav("home")}>الرئيسية</span>
              <span className="breadcrumb-sep">/</span>
              <span className="breadcrumb-link" onClick={()=>nav("shop")}>المتجر</span>
              <span className="breadcrumb-sep">/</span>
              <span>{p.name}</span>
            </div>
          </div>
        </div>
        <div className="detail-wrap">
          <div className="container">
            <div className="detail-layout">
              {/* Images */}
              <div>
                <div className="detail-main-img" style={{background:"var(--bg2)",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
                  {images.length > 0 && images[selImgIdx] ? (
                    <img src={images[selImgIdx].data} alt={p.name} style={{width:"100%",height:"100%",objectFit:"contain"}} />
                  ) : (
                    <div style={{display:"flex",flexDirection:"column",alignItems:"center",color:"var(--text3)"}}>
                      <span style={{fontSize:48}}>📷</span>
                      <span style={{fontSize:13,marginTop:8}}>لا توجد صورة</span>
                    </div>
                  )}
                </div>
                {images.length > 1 && (
                  <div className="detail-thumbs">
                    {images.map((img, i) => (
                      <div key={i}
                        className={`thumb-item ${i===selImgIdx?"active":""}`}
                        onClick={()=>setSelImgIdx(i)}
                        style={{cursor:"pointer",border:i===selImgIdx?"2px solid var(--p)":"1px solid var(--border)"}}>
                        <img src={img.data} alt={`صورة ${i+1}`} style={{width:"100%",height:"100%",objectFit:"cover"}} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Info */}
              <div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,flexWrap:"wrap"}}>
                  <span style={{fontSize:12,color:"var(--p)",fontWeight:700,textTransform:"uppercase"}}>{cat?.name}</span>
                  {p.oldPrice && <span className="price-save">-{save}%</span>}
                </div>
                <h1 className="detail-name">{p.name}</h1>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                  <Stars n={p.rating}/>
                  <span style={{fontSize:13,color:"var(--text3)"}}>({p.reviews} تقييم)</span>
                </div>
                <div style={{marginBottom:16}}>
                  <span className="detail-price">{FMT(curPrice)}</span>
                  {p.oldPrice && <span className="detail-old">{FMT(p.oldPrice)}</span>}
                </div>
                <p className="detail-desc">{p.desc}</p>

                {/* Variants */}
                {p.variants && p.variants.length > 0 && (
                  <div style={{marginBottom:16,padding:"14px",background:"var(--bg2)",borderRadius:"var(--r)",border:"1px solid var(--border)"}}>
                    <div style={{fontWeight:700,fontSize:13,marginBottom:10}}>🎨 الموديلات المتاحة:</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:12}}>
                      {p.variants.map((v, i) => (
                        <button key={i} style={{
                          padding:"8px 16px", borderRadius:"8px",
                          border: selVarIdx===i ? "2px solid var(--p)" : "1.5px solid var(--border)",
                          background: selVarIdx===i ? "var(--p)" : "var(--bg)",
                          color: selVarIdx===i ? "white" : "var(--text)",
                          cursor:"pointer", fontWeight:600, fontSize:13, fontFamily:"inherit",
                          transition:"all .15s"
                        }} onClick={()=>setSelVarIdx(i)}>
                          {v.label}
                          {v.price && v.price !== p.price
                            ? <span style={{fontSize:11,marginRight:4,opacity:.85}}> — {FMT(v.price)}</span>
                            : ""}
                        </button>
                      ))}
                    </div>
                    {curVariant && (
                      <div style={{fontSize:13,color:"var(--text)",fontWeight:700,marginBottom:8}}>
                        السعر: <span style={{color:"var(--p)"}}>{FMT(curVariant.price || p.price)}</span>
                      </div>
                    )}
                    {curVariant?.description && (
                      <div style={{fontSize:12,color:"var(--text2)",padding:"10px",background:"var(--bg)",borderRadius:6,borderRight:"3px solid var(--p)"}}>
                        <div style={{fontWeight:600,marginBottom:4}}>📝 الفروقات:</div>
                        {curVariant.description}
                      </div>
                    )}
                  </div>
                )}

                <div className="stock-badge" style={{marginBottom:16}}>
                  <div className="stock-dot" />
                  متوفر في المخزون
                </div>
                <div className="qty-wrap">
                  <span className="qty-label">الكمية:</span>
                  <div className="qty-ctrl">
                    <button className="qty-btn" onClick={()=>setDetailQty(q=>Math.max(1,q-1))}>−</button>
                    <span className="qty-val">{detailQty}</span>
                    <button className="qty-btn" onClick={()=>setDetailQty(q=>q+1)}>+</button>
                  </div>
                </div>
                <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:14}}>
                  <button className="btn btn-primary btn-lg" style={{flex:1}} onClick={()=>{ addCart(p, detailQty); nav("checkout"); }}>⚡ شراء الآن</button>
                  <button className="btn btn-secondary btn-lg" style={{flex:1}} onClick={()=>{ addCart(p, detailQty); }}>🛒 أضف للسلة</button>
                  <button className={`btn btn-secondary btn-lg btn-icon`} style={{color: inWish ? "var(--danger)" : undefined}} onClick={()=>toggleWish(p.id)}>{inWish ? "❤" : "♡"}</button>
                </div>
                <a className="btn btn-secondary btn-full" href={`https://wa.me/213664074880?text=${encodeURIComponent("مرحباً، أريد الاستفسار عن: " + p.name + (curVariant ? " (" + curVariant.label + ")" : ""))}`} target="_blank" rel="noopener noreferrer" style={{color:"#25D366",borderColor:"#25D366"}}>
                  📱 اطلب عبر واتساب
                </a>

                {/* Tags */}
                <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:16}}>
                  {p.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div style={{marginTop:40}}>
              <div className="tabs">
                {[["desc","وصف المنتج"],["specs","المواصفات"],["reviews",`التقييمات (${sampleReviews.length})`]].map(([k,l]) => (
                  <button key={k} className={`tab ${detailTab===k?"active":""}`} onClick={()=>setDetailTab(k)}>{l}</button>
                ))}
              </div>
              {detailTab === "desc" && (
                <p style={{fontSize:14,color:"var(--text2)",lineHeight:1.8,maxWidth:700}}>{p.desc} Lorem ipsum dolor sit amet, consectetur adipiscing elit. هذا المنتج من أفضل ما يمكن اقتناؤه في فئته، تم تصنيعه بمعايير عالية الجودة.</p>
              )}
              {detailTab === "specs" && (
                <ul className="spec-list" style={{maxWidth:500}}>
                  {p.specs.map((s,i) => <li key={i}><span className="spec-dot" />{s}</li>)}
                </ul>
              )}
              {detailTab === "reviews" && (
                <div style={{maxWidth:650}}>
                  {sampleReviews.map((r,i) => (
                    <div key={i} className="review-item">
                      <div className="review-head">
                        <div style={{display:"flex",alignItems:"center",gap:10}}>
                          <div style={{width:34,height:34,borderRadius:"50%",background:"var(--p-light)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:"var(--p)"}}>{r.author[0]}</div>
                          <div>
                            <div className="review-author">{r.author}</div>
                            <Stars n={r.rating} />
                          </div>
                        </div>
                        <span className="review-date">{r.date}</span>
                      </div>
                      <p className="review-text">{r.text}</p>
                    </div>
                  ))}
                  {/* Write review */}
                  <div className="card card-pad" style={{marginTop:20}}>
                    <div className="card-title" style={{fontSize:15}}>اكتب تقييماً</div>
                    <div className="field mb-8"><label className="label">تقييمك</label><div style={{fontSize:22,color:"var(--warning)",cursor:"pointer"}}>★★★★★</div></div>
                    <div className="field mb-8"><label className="label">تعليقك</label><textarea className="textarea" placeholder="شارك تجربتك مع هذا المنتج..." rows={3} /></div>
                    <button className="btn btn-primary btn-sm" onClick={()=>showToast("شكراً على تقييمك!","⭐")}>إرسال التقييم</button>
                  </div>
                </div>
              )}
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div style={{marginTop:48}}>
                <div className="section-head"><div className="section-title">منتجات مشابهة</div></div>
                <div className="products-grid">{related.map(p => <ProductCard key={p.id} p={p} />)}</div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  // ─── CART ────────────────────────────────────────────────────────────────────
  const CartPage = () => (
    <>
      <div className="page-header">
        <div className="container">
          <div className="page-title">سلة المشتريات</div>
          <div className="breadcrumb">
            <span className="breadcrumb-link" onClick={()=>nav("home")}>الرئيسية</span>
            <span className="breadcrumb-sep">/</span>
            <span>السلة</span>
          </div>
        </div>
      </div>
      <div className="cart-wrap">
        <div className="container">
          {cart.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">🛒</div>
              <div className="empty-text">سلتك فارغة</div>
              <button className="btn btn-primary" onClick={()=>nav("shop")}>ابدأ التسوق</button>
            </div>
          ) : (
            <div className="cart-layout">
              <div>
                <div className="card" style={{marginBottom:16}}>
                  {cart.map(item => {
                    const cat = CATEGORIES.find(c => c.id === item.cat);
                    return (
                      <div key={item.id} className="cart-item">
                        <div className="cart-thumb">{item.emoji}</div>
                        <div className="cart-info">
                          <div className="cart-name">{item.name}</div>
                          <div className="cart-cat">{cat?.name}</div>
                          <div className="cart-row">
                            <div className="qty-ctrl">
                              <button className="qty-btn" onClick={()=>updateQty(item.id,-1)}>−</button>
                              <span className="qty-val">{item.qty}</span>
                              <button className="qty-btn" onClick={()=>updateQty(item.id,1)}>+</button>
                            </div>
                            <button className="remove-btn" onClick={()=>removeCart(item.id)}>✕ إزالة</button>
                          </div>
                        </div>
                        <div style={{textAlign:"start"}}>
                          <div className="cart-price">{FMT(item.price * item.qty)}</div>
                          <div style={{fontSize:12,color:"var(--text3)",marginTop:4}}>{FMT(item.price)} × {item.qty}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button className="btn btn-ghost btn-sm" onClick={()=>nav("shop")}>← متابعة التسوق</button>
              </div>
              <div>
                <div className="summary-box">
                  <div style={{fontSize:16,fontWeight:700,marginBottom:16,color:"var(--text)"}}>ملخص الطلب</div>
                  <div className="summary-row"><span className="summary-label">المجموع الفرعي</span><span className="summary-val">{FMT(subtotal)}</span></div>
                  {discountPct > 0 && <div className="summary-row"><span className="summary-label">الخصم ({discountPct}%)</span><span style={{color:"var(--danger)",fontWeight:600}}>- {FMT(discountAmt)}</span></div>}
                  <div className="summary-row"><span className="summary-label">الشحن</span><span className="summary-val">{FMT(shipping)}</span></div>
                  {shipping === 0 && <div style={{fontSize:12,color:"var(--success)",marginBottom:4}}>✓ توصيل مجاني على الطلبات فوق 5,000 دج</div>}
                  <div className="divider" />
                  <div className="summary-row"><span style={{fontWeight:700,fontSize:15}}>الإجمالي</span><span className="summary-total">{FMT(total)}</span></div>
                  <div className="coupon-row">
                    <input className="input" placeholder="كود الخصم" value={couponCode} onChange={e=>setCouponCode(e.target.value)} style={{fontSize:14}} />
                    <button className="btn btn-secondary btn-sm" onClick={applyCoupon}>تطبيق</button>
                  </div>
                  <div className="coupon-hint">جرب: WINK10 • WELCOME20 • DZ30</div>
                  <button className="btn btn-primary btn-full" style={{marginTop:16}} onClick={()=>nav("checkout")}>إتمام الشراء ←</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );

  // ─── CHECKOUT ────────────────────────────────────────────────────────────────
  // ─── CHECKOUT ────────────────────────────────────────────────────────────────

  // ─── WISHLIST ────────────────────────────────────────────────────────────────
  const WishlistPage = () => {
    const items = products.filter(p => wishlist.includes(p.id));
    return (
      <>
        <div className="page-header">
          <div className="container">
            <div className="page-title">المفضلة ♡</div>
          </div>
        </div>
        <div className="wish-wrap">
          <div className="container">
            {items.length === 0 ? (
              <div className="empty">
                <div className="empty-icon">♡</div>
                <div className="empty-text">قائمة المفضلة فارغة</div>
                <button className="btn btn-primary" onClick={()=>nav("shop")}>تسوق الآن</button>
              </div>
            ) : (
              <div className="products-grid">{items.map(p => <ProductCard key={p.id} p={p} />)}</div>
            )}
          </div>
        </div>
      </>
    );
  };

  // ─── ACCOUNT ────────────────────────────────────────────────────────────────
  const ORDERS_SAMPLE = [
    {id:"WNK-2025-001", date:"5 مارس 2025", status:"delivered", items:3, total:14800},
    {id:"WNK-2025-002", date:"18 مارس 2025", status:"shipped", items:2, total:7300},
    {id:"WNK-2025-003", date:"1 أبريل 2025", status:"confirmed", items:1, total:8900},
    {id:"WNK-2025-004", date:"10 أبريل 2025", status:"pending", items:2, total:3600},
  ];
  const STATUS_MAP = {delivered:["مُسلَّم","status-delivered"],shipped:["في الطريق","status-shipped"],confirmed:["مؤكد","status-confirmed"],pending:["قيد المعالجة","status-pending"]};

  const AccountPage = () => {
    if (!isLoggedIn) { nav("auth"); return null; }
    return (
      <>
        <div className="page-header">
          <div className="container"><div className="page-title">حسابي</div></div>
        </div>
        <div className="account-wrap">
          <div className="container">
            <div className="account-layout">
              <div className="account-sidebar-card">
                <div className="account-avatar">
                  <div className="avatar-img">👤</div>
                  <div className="avatar-name">أمينة بن علي</div>
                  <div className="avatar-email">amina@gmail.com</div>
                </div>
                <div className="account-nav">
                  {[["orders","📦","طلباتي"],["profile","👤","ملفي الشخصي"],["addresses","📍","عناوين التوصيل"]].map(([k,icon,label]) => (
                    <button key={k} className={`account-nav-item ${accountTab===k?"active":""}`} onClick={()=>setAccountTab(k)}>
                      <span>{icon}</span>{label}
                    </button>
                  ))}
                  <div className="divider" style={{margin:"8px 0"}} />
                  <button className="account-nav-item" style={{color:"var(--danger)"}} onClick={()=>{setIsLoggedIn(false);nav("auth");}}>
                    <span>⇥</span> تسجيل الخروج
                  </button>
                </div>
              </div>
              <div className="card card-pad">
                {accountTab === "orders" && (
                  <>
                    <div className="card-title">سجل الطلبات</div>
                    {ORDERS_SAMPLE.map(o => (
                      <div key={o.id} className="order-row">
                        <div>
                          <div className="order-id">{o.id}</div>
                          <div className="order-meta">{o.date} • {o.items} منتجات</div>
                        </div>
                        <span className={`status-pill ${o.status}`}>{STATUS_MAP[o.status][0]}</span>
                        <div style={{fontWeight:700,color:"var(--p)",fontSize:15}}>{FMT(o.total)}</div>
                      </div>
                    ))}
                  </>
                )}
                {accountTab === "profile" && (
                  <>
                    <div className="card-title">ملفي الشخصي</div>
                    <div className="grid-2">
                      <div className="field"><label className="label">الاسم الكامل</label><input className="input" defaultValue="أمينة بن علي" /></div>
                      <div className="field"><label className="label">رقم الهاتف</label><input className="input" defaultValue="0555 987 654" dir="ltr" /></div>
                      <div className="field col-span-2"><label className="label">البريد الإلكتروني</label><input className="input" defaultValue="amina@gmail.com" dir="ltr" /></div>
                    </div>
                    <button className="btn btn-primary btn-sm" style={{marginTop:16}} onClick={()=>showToast("تم الحفظ بنجاح","✓")}>حفظ التغييرات</button>
                  </>
                )}
                {accountTab === "addresses" && (
                  <>
                    <div className="card-title">عناوين التوصيل</div>
                    <div className="info-item">
                      <div className="info-icon">🏠</div>
                      <div>
                        <div className="info-label">المنزل</div>
                        <div className="info-val">ولاية الجزائر العاصمة، بلدية باب الواد، شارع الشهداء، أمام مسجد النور</div>
                      </div>
                    </div>
                    <button className="btn btn-secondary btn-sm" style={{marginTop:12}} onClick={()=>showToast("قريباً: إضافة عنوان جديد","📍")}>+ إضافة عنوان جديد</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // ─── AUTH ────────────────────────────────────────────────────────────────────
  const AuthPage = () => {
    const [tab, setTab] = useState("login");
    return (
      <div className="auth-wrap">
        <div className="auth-card">
          <div className="auth-logo"><Logo size="lg" /></div>
          <div className="auth-tabs">
            <button className={`auth-tab ${tab==="login"?"active":""}`} onClick={()=>setTab("login")}>تسجيل الدخول</button>
            <button className={`auth-tab ${tab==="register"?"active":""}`} onClick={()=>setTab("register")}>إنشاء حساب</button>
          </div>
          <div className="field mb-8"><label className="label">البريد الإلكتروني</label><input className="input" placeholder="email@example.com" type="email" dir="ltr" /></div>
          <div className="field mb-8"><label className="label">كلمة المرور</label><input className="input" placeholder="••••••••" type="password" dir="ltr" /></div>
          {tab === "register" && <div className="field mb-8"><label className="label">الاسم الكامل</label><input className="input" placeholder="اسمك الكامل" /></div>}
          <button className="btn btn-primary btn-full" style={{marginTop:8}} onClick={()=>{setIsLoggedIn(true);nav("account");}}>
            {tab === "login" ? "تسجيل الدخول" : "إنشاء الحساب"}
          </button>
          <div style={{textAlign:"center",marginTop:16,fontSize:13,color:"var(--text3)"}}>أو تواصل معنا عبر <a href="https://wa.me/213664074880" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm" style={{color:"#25D366",textDecoration:"none"}}>📱 واتساب</a></div>
        </div>
      </div>
    );
  };

  // ─── CONTACT ────────────────────────────────────────────────────────────────
  const ContactPage = () => (
    <>
      <div className="page-header">
        <div className="container"><div className="page-title">تواصل معنا</div></div>
      </div>
      <div className="contact-wrap">
        <div className="container">
          <div className="contact-layout">
            <div>
              <div style={{marginBottom:24}}>
                <div className="section-title" style={{marginBottom:8}}>نحن هنا لمساعدتك 👋</div>
                <p style={{fontSize:14,color:"var(--text2)",lineHeight:1.7}}>هل لديك سؤال أو مشكلة في طلبك؟ تواصل معنا وسنرد عليك في أقرب وقت ممكن.</p>
              </div>
              {[
                {icon:"📍", label:"العنوان", val:"الجزائر العاصمة، الجزائر"},
                {icon:"📞", label:"الهاتف", val:"0664 074 880"},
                {icon:"📧", label:"البريد الإلكتروني", val:"support@winkstore.dz"},
                {icon:"🕐", label:"ساعات العمل", val:"السبت - الخميس: 9ص - 9م"},
              ].map((item,i) => (
                <div key={i} className="info-item">
                  <div className="info-icon">{item.icon}</div>
                  <div>
                    <div className="info-label">{item.label}</div>
                    <div className="info-val">{item.val}</div>
                  </div>
                </div>
              ))}
              <div className="social-row" style={{marginTop:20}}>
                <button className="social-btn" title="فيسبوك">📘</button>
                <button className="social-btn" title="إنستغرام">📸</button>
                <a href="https://wa.me/213664074880" target="_blank" rel="noopener noreferrer" className="social-btn" title="واتساب" style={{textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center"}}>📱</a>
                <button className="social-btn" title="تويتر">🐦</button>
              </div>
            </div>
            <div className="card card-pad">
              <div className="card-title">أرسل رسالة</div>
              <div className="field mb-8"><label className="label">الاسم</label><input className="input" placeholder="اسمك الكامل" /></div>
              <div className="field mb-8"><label className="label">الهاتف / البريد</label><input className="input" placeholder="0555 123 456" /></div>
              <div className="field mb-8"><label className="label">الموضوع</label><input className="input" placeholder="موضوع رسالتك" /></div>
              <div className="field mb-8"><label className="label">الرسالة</label><textarea className="textarea" placeholder="اكتب رسالتك هنا..." rows={4} /></div>
              <button className="btn btn-primary btn-full" onClick={()=>showToast("تم إرسال رسالتك! سنتواصل معك قريباً","✉")}>إرسال الرسالة</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // ─── ADMIN ───────────────────────────────────────────────────────────────────
  // ─── ADMIN LOGIN ──────────────────────────────────────────────────────────────
  const ADMIN_USER = "Gorna3a pitchaka";
  const ADMIN_PASS = "V9#qL7@tX2!mN8$zR4^cH1&uK6*eP3";

  const AdminLoginPage = () => {
    const [u, setU] = useState("");
    const [p, setP] = useState("");
    const [err, setErr] = useState("");

    const submit = () => {
      if (u === ADMIN_USER && p === ADMIN_PASS) {
        setIsAdminAuth(true);
        setErr("");
      } else {
        setErr("اسم المستخدم أو كلمة المرور غير صحيحة");
      }
    };

    return (
      <div className="auth-w">
        <div className="auth-c">
          <div style={{textAlign:"center", marginBottom:20}}>
            <div style={{fontSize:28, fontWeight:700, color:"var(--p)"}}>⚙ لوحة التحكم</div>
            <div style={{fontSize:13, color:"var(--tx3)", marginTop:4}}>Wink Store Admin</div>
          </div>
          <div className="fld">
            <label className="lbl">اسم المستخدم</label>
            <input className="inp" placeholder="admin" value={u} onChange={e=>setU(e.target.value)} dir="ltr"
              onKeyDown={e=>e.key==="Enter" && submit()} />
          </div>
          <div className="fld">
            <label className="lbl">كلمة المرور</label>
            <input className="inp" placeholder="••••••••" type="password" value={p} onChange={e=>setP(e.target.value)} dir="ltr"
              onKeyDown={e=>e.key==="Enter" && submit()} />
          </div>
          {err && <div style={{ color: "var(--err)", fontSize: "12px", marginBottom: "12px", textAlign:"center" }}>❌ {err}</div>}
          <button className="btn btn-p btn-full" style={{marginTop:8}} onClick={submit}>تسجيل الدخول</button>
          <button className="btn btn-s btn-full" style={{marginTop:8}} onClick={()=>nav("home")}>العودة للموقع</button>
        </div>
      </div>
    );
  };

  const AdminPanel = () => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [editProd, setEditProd] = useState(null); // product being edited
    const [newProd, setNewProd] = useState({
      name:"", price:"", oldPrice:"", cat:1, emoji:"📦", desc:"", tags:"",
      images: [],
      variants:[{label:"افتراضي", price:"", description:"", image:""}]
    });
    // Coupon state
    const [newCouponCode, setNewCouponCode] = useState("");
    const [newCouponPct, setNewCouponPct] = useState("");
    // Shipping rates editing state
    const [editingRates, setEditingRates] = useState(false);
    const [localRates, setLocalRates] = useState(shippingRates);
    const [rateSearch, setRateSearch] = useState("");

    const addImages = (e) => {
      const files = Array.from(e.target.files || []);
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (evt) => {
          setNewProd(p => ({...p, images: [...p.images, {name: file.name, data: evt.target.result}]}));
        };
        reader.readAsDataURL(file);
      });
    };

    const removeImage = (idx) => {
      setNewProd(p => ({...p, images: p.images.filter((_, i) => i !== idx)}));
    };

    const addVariant = () => {
      setNewProd(p => ({...p, variants: [...p.variants, {label:"", price:"", description:"", image:""}]}));
    };

    const removeVariant = (i) => {
      setNewProd(p => ({...p, variants: p.variants.filter((_, j) => j !== i)}));
    };

    const setVariant = (i, k, v) => {
      setNewProd(p => ({...p, variants: p.variants.map((vr, j) => j === i ? {...vr, [k]: v} : vr)}));
    };

    const doAddProduct = () => {
      if (!newProd.name || !newProd.price) {
        showToast("يرجى إدخال الاسم والسعر", "⚠");
        return;
      }
      const variants = newProd.variants
        .filter(v => v.label.trim())
        .map(v => ({
          label: v.label,
          price: +v.price || +newProd.price,
          description: v.description,
          image: v.image
        }));
      if (variants.length === 0) {
        showToast("أضف موديل واحد على الأقل", "⚠");
        return;
      }
      const prod = {
        id: Date.now(),
        name: newProd.name,
        cat: +newProd.cat,
        price: +newProd.price,
        oldPrice: newProd.oldPrice ? +newProd.oldPrice : null,
        rating: 4.5,
        reviews: 0,
        emoji: newProd.emoji || "📦",
        tags: newProd.tags.split(",").map(t => t.trim()).filter(Boolean),
        desc: newProd.desc,
        specs: [],
        variants,
        images: newProd.images,
        stock: 999
      };
      // حفظ في Supabase إذا متصل
      if (dbConnected) {
        showToast("جاري الحفظ في قاعدة البيانات...", "⏳");
        const dbId = await saveProductToSupabase(prod, newProd.images, variants);
        if (dbId) { prod.id = dbId; showToast("تم إضافة المنتج وحفظه في Supabase ✓", "✓"); }
        else { showToast("تم الإضافة محلياً (فشل الحفظ في قاعدة البيانات)", "⚠"); }
      } else {
        showToast("تم إضافة المنتج بنجاح ✓", "✓");
      }
      setProducts(p => [...p, prod]);
      setShowAddForm(false);
      setNewProd({name:"",price:"",oldPrice:"",cat:1,emoji:"📦",desc:"",tags:"",images:[],variants:[{label:"افتراضي",price:"",description:"",image:""}]});
    };
    const maxRev = 71000;
    const chartData = [{val:42000,lbl:"يناير"},{val:38000,lbl:"فبراير"},{val:55000,lbl:"مارس"},{val:48000,lbl:"أبريل"},{val:62000,lbl:"مايو"},{val:58000,lbl:"يونيو"},{val:71000,lbl:"يوليو"}];

    // Old functions removed - using doAddProduct instead

    const ORDERS_DATA = [{id:"WNK-001",date:"5 أبريل",status:"delivered",total:14800,items:3},{id:"WNK-002",date:"6 أبريل",status:"shipped",total:7300,items:2},{id:"WNK-003",date:"8 أبريل",status:"confirmed",total:8900,items:1},{id:"WNK-004",date:"10 أبريل",status:"pending",total:3600,items:2}];

    const adminNavItems = [
      {id:"dashboard",icon:"◈",label:"لوحة التحكم"},
      {id:"products",icon:"📦",label:"المنتجات"},
      {id:"shipping",icon:"🚚",label:"إدارة الشحن"},
      {id:"orders",icon:"🧾",label:"الطلبات"},
      {id:"customers",icon:"👥",label:"العملاء"},
      {id:"coupons",icon:"🏷",label:"الكوبونات"},
      {id:"analytics",icon:"📊",label:"التحليلات"},
    ];

    return (
      <div className="admin-app">

        {/* ── Edit Product Modal ── */}
        {editProd && (
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
            <div style={{background:"var(--bg)",borderRadius:"var(--radius2)",padding:24,width:"100%",maxWidth:600,maxHeight:"90vh",overflowY:"auto",boxShadow:"0 20px 60px rgba(0,0,0,.3)"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18}}>
                <div style={{fontWeight:700,fontSize:16}}>✏ تعديل المنتج</div>
                <button onClick={()=>setEditProd(null)} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"var(--text2)"}}>✕</button>
              </div>
              <div className="grid-2">
                <div className="field">
                  <label className="label">اسم المنتج *</label>
                  <input className="input" value={editProd.name} onChange={e=>setEditProd(p=>({...p,name:e.target.value}))}/>
                </div>
                <div className="field">
                  <label className="label">التصنيف</label>
                  <select className="select" value={editProd.cat} onChange={e=>setEditProd(p=>({...p,cat:+e.target.value}))}>
                    {CATEGORIES.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label className="label">السعر (دج) *</label>
                  <input className="input" type="number" value={editProd.priceStr} onChange={e=>setEditProd(p=>({...p,priceStr:e.target.value,price:+e.target.value}))}/>
                </div>
                <div className="field">
                  <label className="label">السعر الأصلي (دج)</label>
                  <input className="input" type="number" placeholder="اختياري" value={editProd.oldPriceStr} onChange={e=>setEditProd(p=>({...p,oldPriceStr:e.target.value,oldPrice:e.target.value?+e.target.value:null}))}/>
                </div>
                <div className="field col-span-2">
                  <label className="label">الوصف</label>
                  <textarea className="textarea" rows={2} value={editProd.desc} onChange={e=>setEditProd(p=>({...p,desc:e.target.value}))}/>
                </div>
                <div className="field col-span-2">
                  <label className="label">الوسوم (مفصولة بفاصلة)</label>
                  <input className="input" value={editProd.tagsStr} onChange={e=>setEditProd(p=>({...p,tagsStr:e.target.value,tags:e.target.value.split(",").map(t=>t.trim()).filter(Boolean)}))}/>
                </div>
              </div>
              {/* Edit variants */}
              <div style={{marginTop:14,padding:14,background:"var(--bg2)",borderRadius:"var(--r)"}}>
                <div style={{fontWeight:700,fontSize:13,marginBottom:10}}>🎨 الموديلات</div>
                {(editProd.variants||[]).map((v,i)=>(
                  <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1fr auto",gap:8,marginBottom:8}}>
                    <input className="input" placeholder="اسم الموديل" value={v.label}
                      onChange={e=>setEditProd(p=>({...p,variants:p.variants.map((vr,j)=>j===i?{...vr,label:e.target.value}:vr)}))} style={{fontSize:13}}/>
                    <input className="input" type="number" placeholder="السعر" value={v.price}
                      onChange={e=>setEditProd(p=>({...p,variants:p.variants.map((vr,j)=>j===i?{...vr,price:e.target.value}:vr)}))} style={{fontSize:13}}/>
                    <button className="btn btn-err btn-sm" onClick={()=>setEditProd(p=>({...p,variants:p.variants.filter((_,j)=>j!==i)}))} disabled={editProd.variants.length<=1}>✕</button>
                    <div className="col-span-2" style={{gridColumn:"1/-1"}}>
                      <textarea className="textarea" placeholder="وصف الفروقات..." value={v.description||""}
                        onChange={e=>setEditProd(p=>({...p,variants:p.variants.map((vr,j)=>j===i?{...vr,description:e.target.value}:vr)}))}
                        style={{fontSize:12,minHeight:50}}/>
                    </div>
                  </div>
                ))}
                <button className="btn btn-s btn-sm" style={{marginTop:4}} onClick={()=>setEditProd(p=>({...p,variants:[...p.variants,{label:"",price:"",description:"",image:""}]}))}>+ موديل جديد</button>
              </div>
              <div style={{display:"flex",gap:10,marginTop:18}}>
                <button className="btn btn-primary" onClick={()=>{
                  setProducts(prev=>prev.map(x=>x.id===editProd.id?{...editProd,price:+editProd.priceStr||editProd.price}:x));
                  setEditProd(null);
                  showToast("تم حفظ التعديلات ✓","✓");
                }}>✓ حفظ التعديلات</button>
                <button className="btn btn-s" onClick={()=>setEditProd(null)}>إلغاء</button>
              </div>
            </div>
          </div>
        )}

        <div className="admin-sidebar">
          <div className="admin-logo">
            <div className="logo-mark">W</div>
            <div>
              <div style={{fontSize:14,fontWeight:700,color:"var(--text)"}}>Wink Store</div>
              <div style={{fontSize:11,color:"var(--text3)"}}>لوحة الإدارة</div>
            </div>
          </div>
          <div className="admin-nav">
            {adminNavItems.map(item => (
              <button key={item.id} className={`admin-nav-item ${adminTab===item.id?"active":""}`} onClick={()=>setAdminTab(item.id)}>
                <span>{item.icon}</span>{item.label}
              </button>
            ))}
            <div className="divider" style={{margin:"12px 0"}} />
            <button className="admin-nav-item" onClick={()=>nav("home")}>← العودة للمتجر</button>
            <button className="admin-nav-item" style={{color:"#ff5050"}} onClick={()=>{setIsAdminAuth(false);nav("home");}}>⇥ تسجيل الخروج</button>
          </div>
        </div>
        <div className="admin-main">
          {/* Dashboard */}
          {adminTab === "dashboard" && (
            <>
              <div className="admin-header">
                <div className="admin-title">لوحة التحكم</div>
                <div style={{fontSize:13,color:"var(--text3)"}}>آخر تحديث: منذ دقيقتين</div>
              </div>
              <div className="admin-content">
                <div className="stat-cards">
                  {[
                    {label:"إجمالي الإيراد",val:"248,750 دج",change:"↑ 12.5%",icon:"💰"},
                    {label:"الطلبات",val:"1,284",change:"↑ 8.2%",icon:"📦"},
                    {label:"العملاء",val:"856",change:"↑ 15.1%",icon:"👥"},
                    {label:"متوسط الطلب",val:"19,370 دج",change:"↑ 4.3%",icon:"📈"},
                  ].map((s,i) => (
                    <div key={i} className="stat-card">
                      <div className="stat-card-icon">{s.icon}</div>
                      <div className="stat-card-label">{s.label}</div>
                      <div className="stat-card-val">{s.val}</div>
                      <div className="stat-card-change">{s.change} هذا الشهر</div>
                    </div>
                  ))}
                </div>

                {/* Chart */}
                <div className="data-table" style={{padding:20,marginBottom:20}}>
                  <div style={{fontWeight:700,fontSize:14,marginBottom:16,color:"var(--text)"}}>الإيراد الشهري</div>
                  <div className="bar-chart">
                    {chartData.map((d,i) => (
                      <div key={i} className="bar-col">
                        <div className="bar" style={{height:`${(d.val/maxRev)*100}px`}} title={FMT(d.val)} />
                        <div className="bar-lbl">{d.lbl}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="data-table">
                  <div className="data-table-header">
                    <span className="data-table-title">أحدث الطلبات</span>
                    <button className="btn btn-secondary btn-sm" onClick={()=>setAdminTab("orders")}>عرض الكل</button>
                  </div>
                  <table>
                    <thead><tr><th>رقم الطلب</th><th>التاريخ</th><th>الحالة</th><th>الإجمالي</th><th>إجراء</th></tr></thead>
                    <tbody>
                      {ORDERS_DATA.map(o => (
                        <tr key={o.id}>
                          <td style={{fontWeight:700,color:"var(--p)"}}>{o.id}</td>
                          <td style={{color:"var(--text2)"}}>{o.date}</td>
                          <td><span className={`status-pill ${o.status}`}>{STATUS_MAP[o.status][0]}</span></td>
                          <td style={{fontWeight:700}}>{FMT(o.total)}</td>
                          <td><button className="btn btn-secondary btn-sm" onClick={()=>showToast("تفاصيل الطلب")}>عرض</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Products */}
          {adminTab === "products" && (
            <>
              <div className="admin-header">
                <div className="admin-title">إدارة المنتجات</div>
                <button className="btn btn-primary btn-sm" onClick={()=>setShowAddForm(v=>!v)}>+ إضافة منتج</button>
              </div>
              <div className="admin-content">
                {showAddForm && (
                  <div className="data-table" style={{marginBottom:20, padding:20}}>
                    <div style={{fontWeight:700, fontSize:14, marginBottom:16}}>✚ إضافة منتج جديد</div>

                    {/* Basic Info */}
                    <div style={{marginBottom:20, padding:"14px", background:"var(--bg2)", borderRadius:"var(--r)"}}>
                      <div style={{fontWeight:600, fontSize:13, marginBottom:10}}>📋 البيانات الأساسية</div>
                      <div className="grid-2">
                        <div className="field">
                          <label className="label">اسم المنتج *</label>
                          <input className="input" placeholder="مثال: سماعات لاسلكية" value={newProd.name}
                            onChange={e => setNewProd(p => ({...p, name: e.target.value}))} />
                        </div>
                        <div className="field">
                          <label className="label">التصنيف</label>
                          <select className="select" value={newProd.cat} onChange={e => setNewProd(p => ({...p, cat: e.target.value}))}>
                            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                          </select>
                        </div>
                        <div className="field">
                          <label className="label">السعر الأساسي (دج) *</label>
                          <input className="input" type="number" placeholder="4500" value={newProd.price}
                            onChange={e => setNewProd(p => ({...p, price: e.target.value}))} />
                        </div>
                        <div className="field">
                          <label className="label">السعر الأصلي (دج)</label>
                          <input className="input" type="number" placeholder="6000 (اختياري)" value={newProd.oldPrice}
                            onChange={e => setNewProd(p => ({...p, oldPrice: e.target.value}))} />
                        </div>
                        <div className="field">
                          <label className="label">الإيموجي</label>
                          <input className="input" placeholder="📦" value={newProd.emoji}
                            onChange={e => setNewProd(p => ({...p, emoji: e.target.value}))} />
                        </div>
                        <div className="field">
                          <label className="label">الوسوم (مفصولة بفاصلة)</label>
                          <input className="input" placeholder="تقنية، إلكترونيات" value={newProd.tags}
                            onChange={e => setNewProd(p => ({...p, tags: e.target.value}))} />
                        </div>
                        <div className="field col-span-2">
                          <label className="label">الوصف</label>
                          <textarea className="textarea" rows={2} placeholder="وصف المنتج..." value={newProd.desc}
                            onChange={e => setNewProd(p => ({...p, desc: e.target.value}))} />
                        </div>
                      </div>
                    </div>

                    {/* Image Upload */}
                    <div style={{marginBottom:20, padding:"14px", background:"var(--bg2)", borderRadius:"var(--r)"}}>
                      <div style={{fontWeight:600, fontSize:13, marginBottom:10}}>🖼️ الصور</div>
                      <div className="field">
                        <label className="label">رفع صور المنتج</label>
                        <input type="file" multiple accept="image/*" onChange={addImages} style={{
                          padding:"8px", border:"1.5px solid var(--bd)", borderRadius:"var(--r)", width:"100%", cursor:"pointer"
                        }} />
                        <div style={{fontSize:11, color:"var(--tx3)", marginTop:4}}>يمكن رفع عدة صور</div>
                      </div>
                      {newProd.images.length > 0 && (
                        <div style={{marginTop:10}}>
                          <div style={{fontSize:12, fontWeight:600, marginBottom:8}}>الصور المرفوعة:</div>
                          <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:8}}>
                            {newProd.images.map((img, i) => (
                              <div key={i} style={{position:"relative", borderRadius:"var(--r)", overflow:"hidden", border:"1px solid var(--bd)"}}>
                                <img src={img.data} style={{width:"100%", height:"100px", objectFit:"cover"}} alt={`صورة ${i}`} />
                                <button onClick={() => removeImage(i)} style={{
                                  position:"absolute", top:2, right:2, background:"#ff5050", color:"white", border:"none", borderRadius:"50%",
                                  width:24, height:24, cursor:"pointer", fontSize:12, fontWeight:700
                                }}>✕</button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Variants */}
                    <div style={{marginBottom:20, padding:"14px", background:"var(--bg2)", borderRadius:"var(--r)", border:"1px solid var(--bd)"}}>
                      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14}}>
                        <div style={{fontWeight:700, fontSize:14, color:"var(--tx)"}}>🎨 الموديلات / المقاسات / الألوان</div>
                        <button className="btn btn-p btn-sm" onClick={addVariant} style={{fontSize:12}}>+ إضافة موديل</button>
                      </div>
                      
                      {newProd.variants.map((v, i) => (
                        <div key={i} style={{
                          padding:"14px", 
                          marginBottom:i < newProd.variants.length - 1 ? "12px" : "0",
                          background:"var(--bg)", 
                          borderRadius:"var(--r)",
                          border:"1px solid var(--bd)"
                        }}>
                          <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10}}>
                            <div style={{fontWeight:600, fontSize:12, color:"var(--tx3)"}}>الموديل #{i + 1}</div>
                            {newProd.variants.length > 1 && (
                              <button className="btn btn-err btn-sm" onClick={() => removeVariant(i)} style={{fontSize:11, padding:"4px 8px"}}>🗑 حذف</button>
                            )}
                          </div>

                          <div className="field">
                            <label className="label">اسم الموديل *</label>
                            <input className="input" placeholder="مثال: أسود، مقاس M، 256GB" value={v.label}
                              onChange={e => setVariant(i, "label", e.target.value)} style={{fontSize:13}} />
                          </div>

                          <div className="field">
                            <label className="label">السعر (دج) *</label>
                            <input className="input" type="number" placeholder="السعر (تركه فارغاً = السعر الأساسي)" value={v.price}
                              onChange={e => setVariant(i, "price", e.target.value)} style={{fontSize:13}} />
                          </div>

                          <div className="field">
                            <label className="label">وصف الفروقات</label>
                            <textarea className="textarea" placeholder="مثال: لون أسود فاحم، عمر البطارية 40 ساعة، جودة صوت عالية جداً" 
                              value={v.description}
                              onChange={e => setVariant(i, "description", e.target.value)} 
                              style={{fontSize:13, minHeight:"70px", resize:"vertical"}} />
                          </div>

                          <div className="field">
                            <label className="label">صورة الموديل (اختياري)</label>
                            <input className="input" type="file" accept="image/*" 
                              onChange={e => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (evt) => setVariant(i, "image", evt.target.result);
                                  reader.readAsDataURL(file);
                                }
                              }} 
                              style={{fontSize:13, padding:"10px"}} />
                          </div>
                        </div>
                      ))}

                      <div style={{fontSize:12, color:"var(--tx2)", padding:"10px 12px", background:"var(--bg3)", borderRadius:8, marginTop:12, borderLeft:"3px solid var(--p)"}}>
                        💡 <strong>تلميح:</strong> كل موديل يمكن أن يكون له سعر مختلف ووصف يوضح الفروقات (الألوان، المقاسات، المواصفات)
                      </div>
                    </div>

                    <div style={{display:"flex", gap:10}}>
                      <button className="btn btn-p" onClick={doAddProduct}>✓ حفظ المنتج</button>
                      <button className="btn btn-s" onClick={() => setShowAddForm(false)}>إلغاء</button>
                    </div>
                  </div>
                )}
                <div className="data-table">
                  <div className="data-table-header">
                    <span className="data-table-title">{products.length} منتج</span>
                  </div>
                  <table>
                    <thead><tr><th>المنتج</th><th>التصنيف</th><th>السعر</th><th>الموديلات</th><th>الصور</th><th>التقييم</th><th>إجراءات</th></tr></thead>
                    <tbody>
                      {products.map(p => {
                        const cat = CATEGORIES.find(c => c.id === p.cat);
                        return (
                          <tr key={p.id}>
                            <td><div style={{display:"flex", alignItems:"center", gap:10}}><span style={{fontSize:22}}>{p.emoji}</span><span style={{fontWeight:600}}>{p.name}</span></div></td>
                            <td><span className="tag">{cat?.icon} {cat?.name}</span></td>
                            <td style={{fontWeight:700, color:"var(--p)"}}>{FMT(p.price)}</td>
                            <td style={{fontSize:12, color:"var(--tx2)"}}>
                              {p.variants?.length || 1} موديل
                              <br/>
                              {p.variants?.slice(0, 2).map(v => (
                                <span key={v.label} style={{display:"block", marginTop:3, fontSize:11, color:"var(--tx3)"}}>
                                  • {v.label}: {v.price ? FMT(v.price) : FMT(p.price)}
                                </span>
                              ))}
                              {(p.variants?.length || 0) > 2 && <span style={{fontSize:11, color:"var(--tx3)"}}>+ {p.variants.length - 2} آخرين</span>}
                            </td>
                            <td style={{textAlign:"center"}}>
                              {p.images?.length > 0 ? (
                                <div style={{fontSize:14}}>🖼️ {p.images.length}</div>
                              ) : (
                                <span style={{color:"var(--tx3)", fontSize:12}}>بدون</span>
                              )}
                            </td>
                            <td>⭐ {p.rating}</td>
                            <td>
                              <div className="td-action">
                                <button className="btn btn-s btn-sm" onClick={() => setEditProd({...p, priceStr:String(p.price), oldPriceStr:p.oldPrice?String(p.oldPrice):"", tagsStr:(p.tags||[]).join(", ")})}>تعديل</button>
                                <button className="btn btn-err btn-sm" onClick={() => {
                                  setProducts(pr => pr.filter(x => x.id !== p.id));
                                  if (dbConnected) deleteProductFromSupabase(p.id);
                                  showToast("تم حذف المنتج", "🗑");
                                }}>حذف</button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Shipping Management */}
          {adminTab === "shipping" && (
            <>
              <div className="admin-header">
                <div className="admin-title">إدارة أسعار الشحن 🚚</div>
                <div style={{display:"flex",gap:8}}>
                  {editingRates ? (
                    <>
                      <button className="btn btn-ok btn-sm" onClick={()=>{
                        setShippingRates(localRates);
                        if (dbConnected) {
                          showToast("جاري الحفظ...", "⏳");
                          const ok = await saveShippingRatesToSupabase(localRates);
                          showToast(ok ? "تم حفظ أسعار الشحن في Supabase ✓" : "تم الحفظ محلياً فقط ⚠", ok ? "✓" : "⚠");
                        } else {
                          showToast("تم حفظ أسعار الشحن بنجاح","✓");
                        }
                        setEditingRates(false);
                      }}>✓ حفظ التغييرات</button>
                      <button className="btn btn-secondary btn-sm" onClick={()=>{
                        setLocalRates(shippingRates);
                        setEditingRates(false);
                      }}>إلغاء</button>
                    </>
                  ) : (
                    <button className="btn btn-primary btn-sm" onClick={()=>setEditingRates(true)}>✏ تعديل الأسعار</button>
                  )}
                </div>
              </div>
              <div className="admin-content">
                <div style={{background:"var(--p-light)",border:"1px solid rgba(37,99,235,.2)",borderRadius:"var(--radius)",padding:"12px 16px",marginBottom:18,fontSize:13}}>
                  <div style={{fontWeight:700,color:"var(--p)",marginBottom:4}}>📋 مزود الشحن: Anderson Ecommerce</div>
                  <div style={{color:"var(--text2)"}}>
                    الأسعار الحالية مستخرجة من جدول Anderson Ecommerce الرسمي ({shippingRates.length} ولاية).
                    {editingRates ? <strong style={{color:"var(--danger)"}}> وضع التعديل مفعّل — عدّل الأسعار ثم اضغط حفظ.</strong> : " اضغط 'تعديل الأسعار' للتحديث."}
                  </div>
                </div>
                <div style={{marginBottom:14}}>
                  <input className="input" placeholder="ابحث عن ولاية..." value={rateSearch} onChange={e=>setRateSearch(e.target.value)} style={{maxWidth:280}}/>
                </div>
                <div className="data-table">
                  <div className="data-table-header">
                    <span className="data-table-title">
                      {localRates.filter(r=>r.name.includes(rateSearch)||rateSearch==="").length} ولاية
                    </span>
                    {editingRates && <span style={{fontSize:12,color:"var(--danger)",fontWeight:600}}>⚠ وضع التعديل — الأرقام قابلة للتغيير</span>}
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>الرقم</th><th>الولاية</th><th>المدة</th>
                        <th>منزل (دج) 🏠</th><th>مكتب (دج) 🏢</th>
                      </tr>
                    </thead>
                    <tbody>
                      {localRates.filter(r=>r.name.includes(rateSearch)||rateSearch==="").map(r=>(
                        <tr key={r.id}>
                          <td style={{color:"var(--text3)",fontWeight:600,fontSize:12}}>{String(r.id).padStart(2,"0")}</td>
                          <td style={{fontWeight:600}}>{r.name}</td>
                          <td><span style={{background:"var(--bg3)",color:"var(--text2)",padding:"2px 7px",borderRadius:5,fontSize:11,fontFamily:"monospace"}}>{r.delay}</span></td>
                          <td>
                            {editingRates ? (
                              <input type="number" className="input" style={{width:90,fontSize:13,padding:"6px 8px",fontWeight:700,color:"var(--p)"}}
                                value={r.domicile}
                                onChange={e=>setLocalRates(prev=>prev.map(x=>x.id===r.id?{...x,domicile:+e.target.value}:x))}/>
                            ) : (
                              <span style={{fontWeight:700,color:"var(--p)"}}>{FMT(r.domicile)}</span>
                            )}
                          </td>
                          <td>
                            {editingRates ? (
                              <input type="number" className="input" style={{width:90,fontSize:13,padding:"6px 8px"}}
                                value={r.bureau||""} placeholder="—"
                                onChange={e=>setLocalRates(prev=>prev.map(x=>x.id===r.id?{...x,bureau:e.target.value?+e.target.value:null}:x))}/>
                            ) : (
                              r.bureau ? <span style={{fontWeight:700}}>{FMT(r.bureau)}</span> : <span style={{color:"var(--text3)",fontSize:12}}>غير متوفر</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
          {adminTab === "orders" && (
            <>
              <div className="admin-header"><div className="admin-title">إدارة الطلبات</div></div>
              <div className="admin-content">
                <div className="data-table">
                  <table>
                    <thead><tr><th>رقم الطلب</th><th>التاريخ</th><th>المنتجات</th><th>الحالة</th><th>الإجمالي</th><th>إجراء</th></tr></thead>
                    <tbody>
                      {ORDERS_DATA.map(o => (
                        <tr key={o.id}>
                          <td style={{fontWeight:700,color:"var(--p)"}}>{o.id}</td>
                          <td>{o.date}</td>
                          <td>{o.items}</td>
                          <td><span className={`status-pill ${o.status}`}>{STATUS_MAP[o.status][0]}</span></td>
                          <td style={{fontWeight:700}}>{FMT(o.total)}</td>
                          <td><button className="btn btn-secondary btn-sm" onClick={()=>showToast("تفاصيل الطلب "+o.id)}>تفاصيل</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Customers */}
          {adminTab === "customers" && (
            <>
              <div className="admin-header"><div className="admin-title">إدارة العملاء</div></div>
              <div className="admin-content">
                <div className="data-table">
                  <table>
                    <thead><tr><th>العميل</th><th>البريد الإلكتروني</th><th>المدينة</th><th>الطلبات</th><th>الإجمالي</th></tr></thead>
                    <tbody>
                      {TESTIMONIALS.map((c,i) => (
                        <tr key={i}>
                          <td><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:32,height:32,borderRadius:"50%",background:"var(--p-light)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--p)",fontWeight:700,fontSize:13}}>{c.name[0]}</div><span style={{fontWeight:600}}>{c.name}</span></div></td>
                          <td style={{color:"var(--text2)"}}>{c.name.toLowerCase().replace(" ",".")}@gmail.com</td>
                          <td>{c.city}</td>
                          <td style={{color:"var(--p)",fontWeight:700}}>{[4,2,7][i]}</td>
                          <td style={{fontWeight:700}}>{FMT([38500,18600,52700][i])}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Coupons */}
          {adminTab === "coupons" && (
            <>
              <div className="admin-header">
                <div className="admin-title">إدارة الكوبونات</div>
              </div>
              <div className="admin-content">
                {/* Add coupon form */}
                <div className="data-table" style={{padding:18,marginBottom:18}}>
                  <div style={{fontWeight:700,fontSize:14,marginBottom:14}}>+ إضافة كوبون جديد</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr auto",gap:10,alignItems:"end"}}>
                    <div className="field">
                      <label className="label">كود الكوبون</label>
                      <input className="input" placeholder="مثال: SUMMER30" value={newCouponCode}
                        onChange={e=>setNewCouponCode(e.target.value.toUpperCase())}
                        style={{fontFamily:"monospace",letterSpacing:2,fontWeight:700}}/>
                    </div>
                    <div className="field">
                      <label className="label">نسبة الخصم %</label>
                      <input className="input" type="number" min="1" max="100" placeholder="مثال: 25"
                        value={newCouponPct} onChange={e=>setNewCouponPct(e.target.value)}/>
                    </div>
                    <button className="btn btn-primary" style={{marginBottom:0}} onClick={()=>{
                      if (!newCouponCode.trim() || !newCouponPct) { showToast("أدخل الكود والنسبة","⚠"); return; }
                      const code = newCouponCode.trim().toUpperCase();
                      if (dbConnected) { await addCouponToSupabase(code, +newCouponPct); }
                      setCoupons(prev=>({...prev,[code]:+newCouponPct}));
                      setNewCouponCode(""); setNewCouponPct("");
                      showToast(`تم إضافة كوبون ${code}`, "✓");
                    }}>إضافة</button>
                  </div>
                </div>
                {/* Coupons table */}
                <div className="data-table">
                  <table>
                    <thead><tr><th>كود الخصم</th><th>نسبة الخصم</th><th>الحالة</th><th>إجراء</th></tr></thead>
                    <tbody>
                      {Object.entries(coupons).map(([code,pct]) => (
                        <tr key={code}>
                          <td style={{fontFamily:"monospace",letterSpacing:2,fontWeight:700,color:"var(--p)"}}>{code}</td>
                          <td><span style={{background:"var(--p-light)",color:"var(--p)",padding:"3px 10px",borderRadius:6,fontWeight:700,fontSize:13}}>{pct}%</span></td>
                          <td><span className="status-pill status-delivered">نشط</span></td>
                          <td>
                            <button className="btn btn-err btn-sm" onClick={()=>{
                              if (dbConnected) deleteCouponFromSupabase(code);
                              setCoupons(prev=>{const n={...prev}; delete n[code]; return n;});
                              showToast(`تم حذف كوبون ${code}`, "🗑");
                            }}>حذف</button>
                          </td>
                        </tr>
                      ))}
                      {Object.keys(coupons).length === 0 && (
                        <tr><td colSpan={4} style={{textAlign:"center",color:"var(--text3)",padding:24}}>لا توجد كوبونات</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Analytics */}
          {adminTab === "analytics" && (
            <>
              <div className="admin-header"><div className="admin-title">التحليلات والإحصاءات</div></div>
              <div className="admin-content">
                <div className="stat-cards">
                  {[
                    {label:"زيارات اليوم",val:"1,284",change:"↑ 22%",icon:"👁"},
                    {label:"معدل التحويل",val:"3.8%",change:"↑ 0.4%",icon:"📈"},
                    {label:"متوسط وقت الجلسة",val:"4م 32ث",change:"↑ 15 ثانية",icon:"⏱"},
                    {label:"معدل التخلي عن السلة",val:"68%",change:"↓ 2.1%",icon:"🛒"},
                  ].map((s,i) => (
                    <div key={i} className="stat-card"><div className="stat-card-icon">{s.icon}</div><div className="stat-card-label">{s.label}</div><div className="stat-card-val">{s.val}</div><div className="stat-card-change">{s.change}</div></div>
                  ))}
                </div>
                <div className="data-table">
                  <div className="data-table-header"><span className="data-table-title">أفضل المنتجات مبيعاً</span></div>
                  <table>
                    <thead><tr><th>المنتج</th><th>المبيعات</th><th>الإيراد</th><th>الحصة</th></tr></thead>
                    <tbody>
                      {products.slice(0,5).map((p,i) => (
                        <tr key={p.id}>
                          <td style={{display:"flex",alignItems:"center",gap:10}}><span>{p.emoji}</span>{p.name}</td>
                          <td style={{fontWeight:700}}>{[128,95,67,54,41][i]}</td>
                          <td style={{color:"var(--p)",fontWeight:700}}>{FMT([128,95,67,54,41][i] * p.price)}</td>
                          <td>
                            <div style={{display:"flex",alignItems:"center",gap:8}}>
                              <div style={{flex:1,height:6,background:"var(--bg3)",borderRadius:99}}>
                                <div style={{width:`${[85,65,50,40,30][i]}%`,height:"100%",background:"var(--p)",borderRadius:99}} />
                              </div>
                              <span style={{fontSize:12,color:"var(--text3)",minWidth:28}}>{[35,25,20,15,10][i]}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  // ─── FOOTER ──────────────────────────────────────────────────────────────────
  const Footer = () => (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p className="footer-about">Wink Store هو متجرك الإلكتروني الجزائري للحصول على أفضل المنتجات بأسعار مناسبة مع توصيل سريع لجميع ولايات الجزائر.</p>
            <div className="social-row">
              {["📘","📸","📱","🐦"].map((s,i) => <button key={i} className="social-btn">{s}</button>)}
            </div>
          </div>
          {[
            {title:"روابط سريعة", links:[{l:"الرئيسية",p:"home"},{l:"المتجر",p:"shop"},{l:"تواصل معنا",p:"contact"},{l:"حسابي",p:"account"}]},
            {title:"خدمة العملاء", links:[{l:"سياسة الإرجاع",p:"contact"},{l:"الشحن والتوصيل",p:"contact"},{l:"الأسئلة الشائعة",p:"contact"},{l:"تتبع الطلب",p:"account"}]},
            {title:"تواصل معنا", links:[{l:"واتساب: 0664 074 880",p:"contact"},{l:"support@winkstore.dz",p:"contact"},{l:"السبت-الخميس: 9ص-9م",p:"contact"}]},
          ].map((col,i) => (
            <div key={i}>
              <div className="footer-col-title">{col.title}</div>
              <ul className="footer-links">
                {col.links.map((link,j) => (
                  <li key={j}><button onClick={()=>nav(link.p)}>{link.l}</button></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2025 Wink Store. جميع الحقوق محفوظة.</div>
          <div style={{display:"flex",gap:8,alignItems:"center",fontSize:12,color:"var(--text3)"}}>
            <span>💳 CIB</span>
            <span>💵 COD</span>
            <span>📱 Dahabia</span>
          </div>
        </div>
      </div>
    </footer>
  );

  // ─── RENDER ───────────────────────────────────────────────────────────────────
  const isAdmin = page === "admin";

  // شاشة التحميل الأولي
  if (dbLoading) return (
    <>
      <style>{CSS}</style>
      <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"var(--bg)",gap:16}}>
        <div style={{fontSize:48}}>🛍️</div>
        <div style={{fontSize:22,fontWeight:700,color:"var(--p)"}}>Wink Store</div>
        <div style={{fontSize:14,color:"var(--text3)"}}>جاري تحميل البيانات...</div>
        <div style={{width:200,height:4,background:"var(--bg3)",borderRadius:99,overflow:"hidden"}}>
          <div style={{height:"100%",background:"var(--p)",borderRadius:99,animation:"loading 1.5s ease-in-out infinite",width:"60%"}}/>
        </div>
        <style>{`@keyframes loading{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}`}</style>
      </div>
    </>
  );

  return (
    <>
      <style>{CSS}</style>
      <div className="app" data-theme={theme}>
        {/* مؤشر حالة Supabase */}
        {!dbConnected && (
          <div style={{background:"#FEF3C7",color:"#92400E",padding:"8px 16px",fontSize:12,textAlign:"center",borderBottom:"1px solid #FCD34D"}}>
            ⚠ يعمل بالبيانات المحلية — تحقق من اتصال Supabase
          </div>
        )}
        {isAdmin ? (isAdminAuth ? <AdminPanel /> : <AdminLoginPage />) : (
          <>
            <Navbar />
            {page === "home" && <><HomePage /><Footer /></>}
            {page === "shop" && <><ShopPage /><Footer /></>}
            {page === "product" && <><ProductDetailPage /><Footer /></>}
            {page === "cart" && <><CartPage /><Footer /></>}
            {page === "checkout" && <CheckoutPage
              cart={cart} subtotal={subtotal} discountAmt={discountAmt} discountPct={discountPct}
              shippingRates={shippingRates} shipMethod={shipMethod} setShipMethod={setShipMethod}
              showToast={showToast} orderDone={orderDone} setOrderDone={setOrderDone}
              setCart={setCart} setDiscountPct={setDiscountPct} setCouponCode={setCouponCode}
              isLoggedIn={isLoggedIn} nav={nav}
            />}
            {page === "wishlist" && <><WishlistPage /><Footer /></>}
            {page === "account" && <><AccountPage /><Footer /></>}
            {page === "auth" && <AuthPage />}
            {page === "contact" && <><ContactPage /><Footer /></>}
          </>
        )}
        {toast && <Toast msg={toast.msg} icon={toast.icon} />}
      </div>
    </>
  );
}
