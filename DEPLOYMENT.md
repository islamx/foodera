# تشغيل التطبيق على Vercel

## المشكلة السابقة
كان التطبيق يعطي خطأ "فشل في تحميل الأقسام" على Vercel لأن الـ API لم يكن مُعد بشكل صحيح.

## الحل المطبق

### 1. إعداد الـ API Rewrites
تم إضافة rewrite rules في `next.config.js` لتوجيه الطلبات إلى الـ API الصحيح:

```javascript
{
  source: "/api/store-types",
  destination: "http://41.38.56.140/Store.ApI/api/StoreTypes/GetAllTypes",
},
{
  source: "/api/store-types/create", 
  destination: "http://41.38.56.140/Store.ApI/api/StoreTypes/CreateStoreType",
},
{
  source: "/api/store-types/update/:id",
  destination: "http://41.38.56.140/Store.ApI/api/StoreTypes/UpdateStoreType/:id", 
}
```

### 2. إضافة Fallback Data
تم إضافة بيانات تجريبية في حالة فشل الـ API:
- مطاعم (Restaurants)
- كافيهات (Cafes) 
- محلات حلويات (Sweet Shops)

### 3. تحسين Error Handling
تم تحسين معالجة الأخطاء لتعرض البيانات التجريبية بدلاً من رسالة الخطأ.

## كيفية التشغيل

### محلياً:
```bash
npm run dev
```

### على Vercel:
1. اربط المشروع بـ Vercel
2. سيتم البناء تلقائياً
3. التطبيق سيعمل على: https://typika.vercel.app/

## ملاحظات مهمة

- إذا فشل الـ API، ستظهر البيانات التجريبية
- يمكن تعديل البيانات التجريبية في `src/lib/api.ts`
- تأكد من أن الـ API server يعمل على `41.38.56.140` 