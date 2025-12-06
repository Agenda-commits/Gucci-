import { Product } from './types';

const BASE_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Gucci Bloom gift set",
    price: "100.000",
    benefit: "20%",
    profit: "120.000",
    imageUrl: "https://i5.walmartimages.com/seo/134-Value-Gucci-Bloom-Perfume-Gift-set-for-Women-2-Pieces_de0ff14d-25ae-48f5-b80a-37344bfac5cc_1.49e8fd674186487a044104a0392ea8d3.jpeg", 
  },
  {
    id: 2,
    name: "Gucci Flora Gorgeous Orchid gift set",
    price: "300.000",
    benefit: "20%",
    profit: "360.000",
    imageUrl: "https://media.theperfumeshop.com/medias/sys_master/prd-images/hd7/h0a/10141209788446/prd-front-1318338_420x420/gucci-flora-gorgeous-orchid-eau-de-parfum-gift-set-420x420.jpg",
  },
  {
    id: 3,
    name: "Gucci Flora Gorgeous Magnolia gift set",
    price: "550.000",
    benefit: "20%",
    profit: "660.000",
    imageUrl: "https://m.media-amazon.com/images/I/51OXtYmirFL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: 4,
    name: "Gucci Guilty Pour Femme gift set",
    price: "890.000",
    benefit: "20%",
    profit: "1.068.000",
    imageUrl: "https://alfarag.com/cdn/shop/files/Screenshot2024-05-31at19.18.31.png?v=1717175930",
  },
];

// Helper to format numbers like "1.000.000"
const formatIDR = (num: number): string => {
  return num.toLocaleString('id-ID');
};

// Price Configuration map
const AGENDA_PRICES: Record<number, number[]> = {
  2: [550000, 750000, 1050000, 1350000],
  3: [1100000, 1500000, 2250000, 3300000],
  4: [2560000, 3500000, 4250000, 5000000],
  5: [5500000, 7600000, 9000000, 12000000],
};

// Image Override Configuration map
const AGENDA_IMAGES: Record<number, Record<number, string>> = {
  1: {
    3: "https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1747845099/847090_FAEUC_9758_001_065_0000_Light.jpg",
    4: "https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1758728705/857595_FAFUF_9870_001_085_0000_Light.jpg"
  },
  2: {
    1: "https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1744218003/497985_AAE5F_1642_001_100_0000_Light.jpg",
    2: "https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1760979630/854267_ZAUG6_1082_001_100_0000_Light.jpg",
    3: "https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1760372115/857362_AAF1I_1000_001_079_0000_Light.jpg",
    4: "https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1757518254/860999_J0740_2126_001_100_0000_Light.jpg"
  },
  3: {
    1: "https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1761846303/857595_AAF09_1807_001_085_0000_Light.jpg",
    2: "https://media.gucci.com/style/DarkGray_Center_0_0_490x490/1740642315/771603_DKT00_7100_015_090_0000_Light-womens-mid-heel-sandal-with-horsebit.jpg",
    3: "https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1763660718/853080_ZAUCE_1016_001_100_0000_Light.jpg",
    4: "https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1679914822/753233_IEFA0_9812_001_100_0000_Light.jpg"
  },
  4: {
    1: "https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1759771833/847384_FAE8G_8668_001_080_0031_Light.jpg",
    2: "https://www.berrysjewellers.co.uk/cdn/shop/files/gucci-gucci-interlocking-18ct-yellow-gold-black-onyx-ring-ybc786547001013-72728319492478.png?v=1747337011&width=800",
    3: "https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1748536299/838483_FAE0P_9746_001_100_0000_Light.jpg",
    4: "https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1759824907/546585_AAE5E_1069_001_100_0016_Light.jpg"
  },
  5: {
    1: "https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1756916103/456126_EABGT_8645_001_080_0000_Light.jpg",
    2: "https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1763649906/675800_FAFE6_6207_001_067_0031_Light.jpg",
    3: "https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1618591505/658574_HUHHG_8565_001_077_0067_Light.jpg",
    4: "https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1750264351/847281_FAE8F_5301_001_084_0000_Light.jpg"
  }
};

// Name Override Configuration map
const AGENDA_NAMES: Record<number, Record<number, string>> = {
  1: {
    3: "GG Emblem Nano Bucket Bag",
    4: "Ophidia Medium Boston Bag"
  },
  2: {
    1: "GG MARMONT WALLET CHAIN",
    2: "LARGE SHOULDER BAG WITH CHAIN",
    3: "LARGE SHOULDER BAG WITH CHAIN",
    4: "RECTANGULAR FRAME SUNGLASSES"
  },
  3: {
    1: "Ophidia Medium Boston Bag",
    2: "Gucci Women's mid-heel sandal with Horsebit",
    3: "GG Boutonne Wool Week Jacket",
    4: "GUCCI 25H WATCH 30MM"
  },
  4: {
    1: "Floral Card Case With Double G",
    2: "18k yellow gold and black onyx stone",
    3: "Ophidia Small Cosmetic Case",
    4: "GG marmont Bi-color wallet on chain"
  },
  5: {
    1: "GG Marmont Python Small Wallet",
    2: "Gucci Diana Crystals Small Tote Bag",
    3: "Gucci Horsebit 1955 Small Shoulder Bag",
    4: "GG Emblem Small Shoulder Bag"
  }
};

// Recommended Items Configuration
// Map of Agenda ID -> Array of Product IDs that are recommended
const RECOMMENDED_ITEMS: Record<number, number[]> = {
  1: [4], // Agenda 1 col 4
  2: [4], // Agenda 2 col 4
  3: [3], // Agenda 3 col 3
  4: [3], // Agenda 4 col 3
  5: [4]  // Agenda 5 col 4
};

// NEW: Collections Page Data (ID 100) - Weekend Special
export const COLLECTION_PRODUCTS = [
  {
    id: 'SP-01',
    name: "Gucci Maison de Karl tote bag",
    price: "18.000.000",
    benefitPercent: "50%",
    profitAmount: "9.000.000",
    totalWithdraw: "27.000.000",
    imageUrl: "https://www.karllagerfeld.com/cdn/shop/files/A4W30310900_1.jpg?v=1762786893&width=1454"
  }
];

export const GET_PRODUCTS = (agendaId: number): Product[] => {
  const prices = AGENDA_PRICES[agendaId];
  const imageOverrides = AGENDA_IMAGES[agendaId];
  const nameOverrides = AGENDA_NAMES[agendaId];
  const recommendedIds = RECOMMENDED_ITEMS[agendaId] || [];

  // Determine base benefit multiplier based on Agenda
  let baseMultiplier = 1.2; // Default 20%
  let baseText = "20%";

  if (agendaId === 4 || agendaId === 5) {
    baseMultiplier = 1.3; // 30% for Agenda 4 and 5
    baseText = "30%";
  }

  return BASE_PRODUCTS.map((product, index) => {
    let newProduct = { ...product };

    // Check if this specific product is recommended
    const isRecommended = recommendedIds.includes(product.id);
    
    // Calculate final multiplier
    // If recommended, force 30% (1.3). Else use base multiplier.
    const multiplier = isRecommended ? 1.3 : baseMultiplier;
    const benefitDisplay = isRecommended ? "30%" : baseText;

    if (isRecommended) {
      newProduct.isRecommended = true;
    }

    // Apply Price and Profit Calculations
    if (prices && index < prices.length) {
      const price = prices[index];
      const profit = price * multiplier;
      newProduct.price = formatIDR(price);
      newProduct.profit = formatIDR(profit);
      newProduct.benefit = benefitDisplay;
    } else {
      // Fallback for products not in price map (Agenda 1 default logic needs handling)
      // If using default string prices, we need to parse them to apply new benefit
      if (agendaId === 1) {
        // Parse "100.000" -> 100000
        const numericPrice = parseInt(product.price.replace(/\./g, ''));
        const profit = numericPrice * multiplier;
        newProduct.profit = formatIDR(profit);
        newProduct.benefit = benefitDisplay;
      }
    }

    // Apply Image Overrides
    if (imageOverrides && imageOverrides[product.id]) {
      newProduct.imageUrl = imageOverrides[product.id];
    }

    // Apply Name Overrides
    if (nameOverrides && nameOverrides[product.id]) {
      newProduct.name = nameOverrides[product.id];
    }

    return newProduct;
  });
};