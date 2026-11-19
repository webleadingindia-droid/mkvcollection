/**
 * ============================================================
 * SAB PRODUCT IMAGES KE URLs — SIRF YAHAN UPDATE KARO
 * ============================================================
 *
 * Format:
 *   "<product-id>": ["url1", "url2", "url3"]
 *
 * - Jitni chaho images (1, 2, 3, 5, 10...) — koi limit nahi
 * - Product ID wahi hai jo products.ts me hai (e.g. "549976178")
 * - URLs external (Cloudinary, Imgur, S3, CDN) ya apni site ke ho sakte hain
 * - Empty array [] rakho to placeholder fallback use hoga
 */

export const PRODUCT_IMAGE_URLS: Record<string, string[]> = {
  // ============ REAL PRODUCTS ============

  // 1. Paneer Tikka Platter Magnet
  "549976178": [
    "https://images.meesho.com/images/products/1048689571/2sigk.jpg",
    "https://images.meesho.com/images/products/1048689571/k0xt3.jpg",
    "https://images.meesho.com/images/products/1048689571/459ds.jpg",
    "https://images.meesho.com/images/products/1048689571/xuvgb.jpg",
  ],

  // 2. Vegetable Market Magnet
  "549959605": [
    "https://images.meesho.com/images/products/1048664690/dylvg.jpg",
    "https://images.meesho.com/images/products/1048664690/osxkt.jpg",
    "https://images.meesho.com/images/products/1048664690/5yzzs.jpg",
    "https://images.meesho.com/images/products/1048664690/tfll4.jpg",
  ],

  // 3. Burger Combo Magnet
  "549898178": [
    "https://images.meesho.com/images/products/1048586615/rcqeg.jpg",
    "https://images.meesho.com/images/products/1048586615/kneaw.jpg",
    "https://images.meesho.com/images/products/1048586615/q9vei.jpg",
    "https://images.meesho.com/images/products/1048586615/gvq5b.jpg",
  ],

  // 4. Grocery Essentials Set
  "546952329": [
    "https://images.meesho.com/images/products/1043871064/oevxw.jpg",
    "https://images.meesho.com/images/products/1043871064/3woja.jpg",
    "https://images.meesho.com/images/products/1043871064/j3hjl.jpg",
  ],

  // 5. Coffee Time Magnet
  "546939787": [
    "https://images.meesho.com/images/products/1043847970/xam7r.jpg",
    "https://images.meesho.com/images/products/1043847970/0xoq9.jpg",
    "https://images.meesho.com/images/products/1043847970/qcdfg.jpg",
  ],

  // 6. Fruit Basket Magnet
  "543217231": [
    "https://images.meesho.com/images/products/1038007558/q7ozf.jpg",
    "https://images.meesho.com/images/products/1038007558/yfrgv.jpg",
    "https://images.meesho.com/images/products/1038007558/gbaxg.jpg",
  ],

  // 7. Heart Taj Mahal Magnet
  "543490252": [
    "https://images.meesho.com/images/products/1036757547/5lra5.jpg",
    "https://images.meesho.com/images/products/1036757547/syzq5.jpg",
  ],

  // 8. Kitchen Essentials Set of 3
  "541323271": [
    "https://images.meesho.com/images/products/1034791597/n00js.jpg",
    "https://images.meesho.com/images/products/1034791597/ipvhd.jpg",
    "https://images.meesho.com/images/products/1034791597/rsx6p.jpg",
  ],

  // 9. Chocolate Candy Pack of 3
  "539799186": [
    "https://images.meesho.com/images/products/1032031839/mkwyq.jpg",
    "https://images.meesho.com/images/products/1032031839/2qsye.jpg",
    "https://images.meesho.com/images/products/1032031839/tijyu.jpg",
    "https://images.meesho.com/images/products/1032031839/3genh.jpg",
  ],

  // 10. Taj Mahal Tea Set
  "539627964": [
    "https://images.meesho.com/images/products/1031703829/1crug.jpg",
    "https://images.meesho.com/images/products/1031703829/bcium.jpg",
    "https://images.meesho.com/images/products/1031703829/evpou.jpg",
    "https://images.meesho.com/images/products/1031703829/3ztfv.jpg",
  ],

  // ============ PLACEHOLDER PRODUCTS ============
  // Inko bhi real photos milne par URL daal do

  "549965907": [
    "https://picsum.photos/seed/mkv-549965907-1/800/800",
    "https://picsum.photos/seed/mkv-549965907-2/800/800",
    "https://picsum.photos/seed/mkv-549965907-3/800/800",
  ],
  "549914646": [
    "https://picsum.photos/seed/mkv-549914646-1/800/800",
    "https://picsum.photos/seed/mkv-549914646-2/800/800",
    "https://picsum.photos/seed/mkv-549914646-3/800/800",
  ],
  "549906037": [
    "https://picsum.photos/seed/mkv-549906037-1/800/800",
    "https://picsum.photos/seed/mkv-549906037-2/800/800",
    "https://picsum.photos/seed/mkv-549906037-3/800/800",
  ],
  "549888049": [
    "https://picsum.photos/seed/mkv-549888049-1/800/800",
    "https://picsum.photos/seed/mkv-549888049-2/800/800",
    "https://picsum.photos/seed/mkv-549888049-3/800/800",
  ],
  "549876887": [
    "https://picsum.photos/seed/mkv-549876887-1/800/800",
    "https://picsum.photos/seed/mkv-549876887-2/800/800",
    "https://picsum.photos/seed/mkv-549876887-3/800/800",
  ],
  "549926998": [
    "https://picsum.photos/seed/mkv-549926998-1/800/800",
    "https://picsum.photos/seed/mkv-549926998-2/800/800",
    "https://picsum.photos/seed/mkv-549926998-3/800/800",
  ],
  "546933627": [
    "https://picsum.photos/seed/mkv-546933627-1/800/800",
    "https://picsum.photos/seed/mkv-546933627-2/800/800",
    "https://picsum.photos/seed/mkv-546933627-3/800/800",
  ],
  "546922930": [
    "https://picsum.photos/seed/mkv-546922930-1/800/800",
    "https://picsum.photos/seed/mkv-546922930-2/800/800",
    "https://picsum.photos/seed/mkv-546922930-3/800/800",
  ],
  "546902137": [
    "https://picsum.photos/seed/mkv-546902137-1/800/800",
    "https://picsum.photos/seed/mkv-546902137-2/800/800",
    "https://picsum.photos/seed/mkv-546902137-3/800/800",
  ],
  "543218847": [
    "https://picsum.photos/seed/mkv-543218847-1/800/800",
    "https://picsum.photos/seed/mkv-543218847-2/800/800",
    "https://picsum.photos/seed/mkv-543218847-3/800/800",
  ],
  "543171332": [
    "https://picsum.photos/seed/mkv-543171332-1/800/800",
    "https://picsum.photos/seed/mkv-543171332-2/800/800",
    "https://picsum.photos/seed/mkv-543171332-3/800/800",
  ],
  "543259768": [
    "https://picsum.photos/seed/mkv-543259768-1/800/800",
    "https://picsum.photos/seed/mkv-543259768-2/800/800",
    "https://picsum.photos/seed/mkv-543259768-3/800/800",
  ],
  "540831401": [
    "https://picsum.photos/seed/mkv-540831401-1/800/800",
    "https://picsum.photos/seed/mkv-540831401-2/800/800",
    "https://picsum.photos/seed/mkv-540831401-3/800/800",
  ],
  "539972048": [
    "https://picsum.photos/seed/mkv-539972048-1/800/800",
    "https://picsum.photos/seed/mkv-539972048-2/800/800",
    "https://picsum.photos/seed/mkv-539972048-3/800/800",
  ],
  "539662232": [
    "https://picsum.photos/seed/mkv-539662232-1/800/800",
    "https://picsum.photos/seed/mkv-539662232-2/800/800",
    "https://picsum.photos/seed/mkv-539662232-3/800/800",
  ],
};