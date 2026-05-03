export interface Product {
  id: string;
  name: string;
  brand: string | null;
  price: number;
  image_url: string | null;
  prescription_required: boolean;
  category: string;
  active?: boolean;
}

export const localProducts: Product[] = [
  {
    id: "acefyl-gold-syp",
    name: "Acefyl Gold Syp 60ml",
    brand: "Local Brand",
    price: 150,
    image_url: "/assets/Acefyl Gold Syp 60ml.jfif",
    prescription_required: false,
    category: "syrups",
    active: true
  },
  {
    id: "amoxicap-125mg",
    name: "Amoxicap 125mg",
    brand: "Local Brand",
    price: 120,
    image_url: "/assets/Amoxicap 125mg.jfif",
    prescription_required: true,
    category: "capsules",
    active: true
  },
  {
    id: "amoxycap-250mg",
    name: "Amoxycap 250mg",
    brand: "Local Brand",
    price: 240,
    image_url: "/assets/Amoxycap 250mg.jfif",
    prescription_required: true,
    category: "capsules",
    active: true
  },
  {
    id: "amoxycap-500mg",
    name: "Amoxycap 500mg",
    brand: "Local Brand",
    price: 450,
    image_url: "/assets/Amoxycap 500mg.jfif",
    prescription_required: true,
    category: "capsules",
    active: true
  },
  {
    id: "ampicilline-inj",
    name: "Ampicilline Inj",
    brand: "Local Brand",
    price: 350,
    image_url: "/assets/Ampicilline Inj.jfif",
    prescription_required: true,
    category: "injections",
    active: true
  },
  {
    id: "bronochol-cough",
    name: "Bronochol Cough 120ml",
    brand: "Local Brand",
    price: 180,
    image_url: "/assets/Bronochol Cough 120ml.jfif",
    prescription_required: false,
    category: "syrups",
    active: true
  },
  {
    id: "brufen-ds-susp",
    name: "Brufen Ds Susp 90ml",
    brand: "Abbott",
    price: 135,
    image_url: "/assets/Brufen Ds Susp 90ml.jfif",
    prescription_required: false,
    category: "syrups",
    active: true
  },
  {
    id: "ceftriaxone-inj",
    name: "Ceftriaxone Inj 1gm",
    brand: "Local Brand",
    price: 850,
    image_url: "/assets/Ceftriaxone Inj 1gm.jfif",
    prescription_required: true,
    category: "injections",
    active: true
  },
  {
    id: "cetirizine-syp",
    name: "Cetirizine Syp 60ml",
    brand: "Local Brand",
    price: 110,
    image_url: "/assets/Cetirizine Syp 60ml.jfif",
    prescription_required: false,
    category: "syrups",
    active: true
  },
  {
    id: "coldrex-tab",
    name: "Coldrex Tab",
    brand: "GSK",
    price: 90,
    image_url: "/assets/Coldrex Tab.jfif",
    prescription_required: false,
    category: "tablets",
    active: true
  },
  {
    id: "dexamethasone-inj",
    name: "Dexamethasone Inj",
    brand: "Local Brand",
    price: 150,
    image_url: "/assets/Dexamethasone Inj.jfif",
    prescription_required: true,
    category: "injections",
    active: true
  },
  {
    id: "diclo-cap-sr",
    name: "Diclo Cap SR 100mg",
    brand: "Local Brand",
    price: 210,
    image_url: "/assets/Diclo Cap SR 100mg.jfif",
    prescription_required: true,
    category: "capsules",
    active: true
  },
  {
    id: "drota-tab",
    name: "Drota Tab 80mg",
    brand: "Local Brand",
    price: 160,
    image_url: "/assets/Drota Tab 80mg.jfif",
    prescription_required: false,
    category: "tablets",
    active: true
  },
  {
    id: "febrol-xtra",
    name: "Febrol Xtra",
    brand: "Local Brand",
    price: 80,
    image_url: "/assets/Febrol Xtra.jfif",
    prescription_required: false,
    category: "tablets",
    active: true
  },
  {
    id: "floramex-cap",
    name: "Floramex Cap",
    brand: "Local Brand",
    price: 320,
    image_url: "/assets/Floramex Cap.jfif",
    prescription_required: false,
    category: "capsules",
    active: true
  },
  {
    id: "gas-syp-samcid",
    name: "Gas Syp Samcid",
    brand: "Local Brand",
    price: 140,
    image_url: "/assets/Gas Syp Samcid.jfif",
    prescription_required: false,
    category: "syrups",
    active: true
  },
  {
    id: "kamic-tab-forte",
    name: "Kamic Tab Forte 500mg",
    brand: "Local Brand",
    price: 280,
    image_url: "/assets/Kamic Tab Forte 500mg.jfif",
    prescription_required: false,
    category: "tablets",
    active: true
  },
  {
    id: "linco-inj",
    name: "Linco Inj",
    brand: "Local Brand",
    price: 120,
    image_url: "/assets/Linco Inj.jfif",
    prescription_required: true,
    category: "injections",
    active: true
  },
  {
    id: "mtz-vail-gold",
    name: "MTZ Vail Gold",
    brand: "Local Brand",
    price: 220,
    image_url: "/assets/MTZ Vail Gold.jfif",
    prescription_required: true,
    category: "injections",
    active: true
  },
  {
    id: "meco-inj",
    name: "Meco Inj",
    brand: "Local Brand",
    price: 180,
    image_url: "/assets/Meco Inj.jfif",
    prescription_required: true,
    category: "injections",
    active: true
  },
  {
    id: "metomide",
    name: "Metomide 50ml",
    brand: "Local Brand",
    price: 95,
    image_url: "/assets/Metomide 50ml.jfif",
    prescription_required: false,
    category: "syrups",
    active: true
  },
  {
    id: "neo-butinol",
    name: "Neo-butinol Tab 200mg",
    brand: "Local Brand",
    price: 130,
    image_url: "/assets/Neo-butinol Tab 200mg.jfif",
    prescription_required: false,
    category: "tablets",
    active: true
  },
  {
    id: "panadol-120ml",
    name: "Panadol 120ml",
    brand: "GSK",
    price: 117,
    image_url: "/assets/Panadol 120ml.jfif",
    prescription_required: false,
    category: "syrups",
    active: true
  },
  {
    id: "risek-insta",
    name: "Risek Insta Powd",
    brand: "Getz",
    price: 420,
    image_url: "/assets/Risek Insta Powd.jfif",
    prescription_required: false,
    category: "capsules",
    active: true
  },
  {
    id: "torax-ex",
    name: "Torax Ex 60ml",
    brand: "Local Brand",
    price: 105,
    image_url: "/assets/Torax Ex 60ml.jfif",
    prescription_required: false,
    category: "syrups",
    active: true
  },
  {
    id: "tramadol-tab",
    name: "Tramadol Tab Aceta Plus",
    brand: "Local Brand",
    price: 350,
    image_url: "/assets/Tramadol Tab Aceta Plus.jfif",
    prescription_required: true,
    category: "tablets",
    active: true
  },
  {
    id: "vicks-balm",
    name: "Vicks Balm Gold",
    brand: "Vicks",
    price: 150,
    image_url: "/assets/Vicks Balm Gold.jfif",
    prescription_required: false,
    category: "ointments",
    active: true
  },
  {
    id: "water-inj",
    name: "Water Inj",
    brand: "Local Brand",
    price: 20,
    image_url: "/assets/Water Inj.jfif",
    prescription_required: true,
    category: "injections",
    active: true
  }
];
