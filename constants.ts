
import { Product } from './types';

const BASE_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Gucci Bloom gift set",
    price: "100.000",
    benefit: "20%",
    profit: "120.000",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw6p1bD37j1GqiU-E6ZzvByuGq1LcgaF54NQ&s", 
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
    1: "https://i5.walmartimages.com/seo/134-Value-Gucci-Bloom-Perfume-Gift-set-for-Women-2-Pieces_de0ff14d-25ae-48f5-b80a-37344bfac5cc_1.49e8fd674186487a044104a0392ea8d3.jpeg",
    3: "https://perfumeoasis.co.uk/cdn/shop/files/GSMAGMNEW.jpg?v=1751975757",
    4: "https://www.perfumedirect.com/cdn/shop/files/gucci-women-s-perfume-gucci-guilty-pour-femme-eau-de-parfum-women-s-gift-set-spray-50ml-with-50ml-body-lotion-72784461922681_large.png"
  },
  2: {
    1: "https://media.gucci.com/style/DarkGray_Center_0_0_1200x1200/1758094278/825787_Z7AVP_5057_001_100_0000_Light-printed-georgette-long-pleated-dress.jpg",
    2: "https://media.gucci.com/style/DarkGray_Center_0_0_1200x1200/1735343201/818349_Z8BYL_3441_001_100_0000_Light-mid-length-gg-cotton-gabardine-dress.jpg",
    3: "https://media.gucci.com/style/DarkGray_Center_0_0_490x490/1758096040/827455_XDDCF_4492_001_100_0000_Light-gg-washed-denim-jacquard-shirt.jpg",
    4: "https://cdna.lystit.com/520/650/n/photos/nugnes1920/564d7cf6/gucci--Rosso-Ancora-Technical-Gabardine-Jacket.jpeg"
  },
  3: {
    1: "https://cdna.lystit.com/1040/1300/n/photos/harrods/P000000000005048069-Gold-3ea424db-.jpeg",
    2: "https://media.gucci.com/style/DarkGray_Center_0_0_490x490/1740642315/771603_DKT00_7100_015_090_0000_Light-womens-mid-heel-sandal-with-horsebit.jpg",
    3: "https://cdn1.jolicloset.com/img4/detail4b/2022/06/540203-1/heels-gucci.jpg",
    4: "https://media.gucci.com/style/White_South_0_160_316x316/1712855737/783821_BNC80_2604_001_090_0000_Light-Gucci-Signoria-slingback-pump.jpg"
  },
  4: {
    1: "https://media.gucci.com/style/DarkGray_Center_0_0_980x980/1741024895/832014_JAAIR_8069_002_100_0000_Light-gucci-interlocking-18k-bangle-bracelet.jpg",
    2: "https://www.berrysjewellers.co.uk/cdn/shop/files/gucci-gucci-interlocking-18ct-yellow-gold-black-onyx-ring-ybc786547001013-72728319492478.png?v=1747337011&width=800",
    3: "https://media.gucci.com/style/DarkGray_Center_0_0_490x490/1720458043/745654_J8500_5702_001_100_0000_Light-gucci-link-to-love-18k-chain-necklace.jpg",
    4: "https://media.neimanmarcus.com/f_auto,q_auto:low,ar_4:5,c_fill,dpr_2.0,w_790/01/nm_4518464_100602_m"
  },
  5: {
    1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrxoRnQqtRhMqX4_TtlL617f0LsuJqtTPHKg&s",
    2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdFZF50dsMasMPh_NmCQVtl6qHHgRdnB8xkw&s",
    3: "https://jrdunn.com/cdn/shop/files/ya1264233_1.jpg?v=1753221015",
    4: "https://media.gucci.com/style/DarkGray_Center_0_0_980x980/1745857947/834500_IEVA0_8591_001_100_0000_Light-gucci-dive-watch-36mm.jpg"
  }
};

// Name Override Configuration map
const AGENDA_NAMES: Record<number, Record<number, string>> = {
  2: {
    1: "Gucci Pink and red polyester georgette",
    2: "Green GG cotton gabardine GUCCI",
    3: "Blue and ivory washed GG denim jacquard",
    4: "Gucci Rosso Ancora red gabardine nylon"
  },
  3: {
    1: "Gucci Marmont Fringed Loafer Heel in Metallic Lyst Canada",
    2: "Gucci Women's mid-heel sandal with Horsebit",
    3: "Gucci Gold Leather Open Toe Pumps Heels with Horsebit Size 37 Golden",
    4: "Women s Designer Luxury High Heels Pumps GUCCI Canada"
  },
  4: {
    1: "18k yellow gold with amazonite stone",
    2: "18k yellow gold and black onyx stone",
    3: "18k rose gold Geometric link chain GUCCI",
    4: "18k rose gold Cut-out GG GUCCI"
  },
  5: {
    1: "Silver-toned dial with Interlocking G, Gucci logo, date at 3 o' clock",
    2: "Gucci Interlocking watch, 29mm",
    3: "G-Timeless watch, 38mm",
    4: "Gucci Dive watch, 36mm"
  }
};

// NEW: Collections Page Data (ID 100) - Weekend Special
export const COLLECTION_PRODUCTS = [
  {
    id: 'SP-01',
    name: "Gucci Maison de Karl tote bag",
    price: "35.650.000",
    benefitPercent: "50%",
    profitAmount: "17.825.000",
    totalWithdraw: "53.475.000",
    imageUrl: "https://www.karllagerfeld.com/cdn/shop/files/A4W30310900_1.jpg?v=1762786893&width=1454"
  }
];

export const GET_PRODUCTS = (agendaId: number): Product[] => {
  const prices = AGENDA_PRICES[agendaId];
  const imageOverrides = AGENDA_IMAGES[agendaId];
  const nameOverrides = AGENDA_NAMES[agendaId];

  return BASE_PRODUCTS.map((product, index) => {
    let newProduct = { ...product };

    // Apply Price Overrides
    if (prices && index < prices.length) {
      const price = prices[index];
      const profit = price * 1.2;
      newProduct.price = formatIDR(price);
      newProduct.profit = formatIDR(profit);
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
