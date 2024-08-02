import React from "react";
import CuredMeatShopIcon from "../assets/freepick/free-vector/drawing-cooking-color-icons_730579/bacon.svg"; //basics icons
import BakeryIcon from "../assets/freepick/free-vector/drawing-cooking-color-icons_730579/bread.svg"; //basics icons
import CheeseDairyIcon from "../assets/freepick/free-vector/drawing-cooking-color-icons_730579/cheese.svg"; //basics icons
import BiscuitFactoryIcon from "../assets/freepick/free-vector/drawing-cooking-color-icons_730579/cookie.svg"; //basics icons
import FishShopIcon from "../assets/freepick/free-vector/drawing-cooking-color-icons_730579/fish.svg"; //basics icons
import VineyardIcon from "../assets/freepick/free-vector/drawing-cooking-color-icons_730579/grape.svg"; //basics icons
import ButcherShopIcon from "../assets/freepick/free-vector/drawing-cooking-color-icons_730579/meat.svg"; //basics icons
import MarketGardenIcon from "../assets/freepick/free-vector/drawing-cooking-color-icons_730579/salad.svg"; //basics icons
import MarketIcon from "../assets/freepick/free-vector/drawing-cooking-color-icons_730579/vegetables_basket.svg"; //basics icons
import WineMerchantIcon from "../assets/freepick/free-vector/drawing-cooking-color-icons_730579/wine.svg"; //basics icons
import AromaticHerbProducerIcon from "../assets/freepick/other/aromatic_herb.svg"; //https://fr.freepik.com/vecteurs-libre/design-plat-feuilles-fleurs-lineaires_17749262.htm#fromView=search&page=1&position=45&uuid=fc3b6ea3-171f-44c3-ad44-f5b1bdb2004e
import BreweryIcon from "../assets/freepick/other/beer.svg"; //https://fr.freepik.com/vecteurs-libre/icones-biere_767010.htm#fromView=search&page=1&position=0&uuid=bd402e54-61ec-40ef-86d3-bb83d8831786
import OrchardIcon from "../assets/freepick/other/bucket_apples.svg"; //https://fr.freepik.com/vecteurs-libre/collection-icones-plat-menage-paysan-ferme-animaux-domestiques_3910295.htm#fromView=search&page=1&position=12&uuid=70c42894-1669-495a-8220-e5702fba3c57
import CatererIcon from "../assets/freepick/other/caterer.svg"; //https://fr.freepik.com/vecteurs-libre/salle-manger-icone-icone-restaurant_1294547.htm#fromView=search&page=1&position=7&uuid=a5769177-58d4-410b-bc27-d7996784bca7
import PoultryBreedingIcon from "../assets/freepick/other/chicken.svg"; //https://fr.freepik.com/vecteurs-libre/collection-icones-plat-menage-paysan-ferme-animaux-domestiques_3910295.htm#fromView=search&page=1&position=12&uuid=70c42894-1669-495a-8220-e5702fba3c57
import ChocolateFactoryIcon from "../assets/freepick/other/chocolate.svg"; //https://fr.freepik.com/vecteurs-libre/icones-nourriture_959688.htm#fromView=search&page=1&position=34&uuid=d939a2b9-cbc5-4a60-8b6d-e053da9e860d
import RoasterIcon from "../assets/freepick/other/coffee_bean.svg"; //https://fr.freepik.com/vecteurs-libre/collection-elements-bon-cafe_1047751.htm#fromView=search&page=1&position=25&uuid=8d04538c-7f37-488d-acfd-2f30e487fe0c
import CooperativeFarmIcon from "../assets/freepick/other/cooperative.svg"; // https://www.freepik.com/free-vector/user-group-circles-multiple-colours_145857011.htm#fromView=search&page=3&position=21&uuid=33826e37-c14b-4fec-865f-6b7676ed86c9
import DairyFarmIcon from "../assets/freepick/other/cow.svg"; //https://fr.freepik.com/vecteurs-libre/collection-icones-plat-menage-paysan-ferme-animaux-domestiques_3910295.htm#fromView=search&page=1&position=12&uuid=70c42894-1669-495a-8220-e5702fba3c57
import OtherIcon from "../assets/freepick/other/danger_panel.svg"; //https://fr.freepik.com/vecteurs-libre/aucun-signe-n-est-indique_207467017.htm#fromView=search&page=1&position=34&uuid=07c25340-e7c1-454b-a961-eaf963dd9698
import PoultryBreedingEggsIcon from "../assets/freepick/other/egg.svg"; //https://thenounproject.com/icon/egg-6442395/
import FarmIcon from "../assets/freepick/other/farm.svg"; //https://fr.freepik.com/vecteurs-libre/collection-icones-plat-menage-paysan-ferme-animaux-domestiques_3910295.htm#fromView=search&page=1&position=12&uuid=70c42894-1669-495a-8220-e5702fba3c57
import MeatFarmIcon from "../assets/freepick/other/farm_meat.svg"; //https://fr.freepik.com/vecteurs-libre/collection-icones-plat-menage-paysan-ferme-animaux-domestiques_3910295.htm#fromView=search&page=1&position=12&uuid=70c42894-1669-495a-8220-e5702fba3c57
import FishFarmIcon from "../assets/freepick/other/fish_farm.svg"; //https://www.freepik.com/free-vector/fishing-icons-collection_1036030.htm#fromView=search&page=1&position=5&uuid=031e5a8e-4147-4372-82ec-7eae3ab7ccfa
import FloristIcon from "../assets/freepick/other/flower.svg"; // https://fr.freepik.com/vecteurs-libre/ensemble-fleurs-colorees_3772108.htm#fromView=search&page=1&position=46&uuid=68e6f679-7dcb-4188-9144-b59738fd42d2
import NonEdibleHorticultureIcon from "../assets/freepick/other/flower_pot.svg"; //https://www.freepik.com/free-vector/horticulture-icon-set_1488765.htm#fromView=search&page=1&position=3&uuid=bc6cf842-99cc-482a-8204-95123679ab99
import GroceryStoreIcon from "../assets/freepick/other/food.svg"; //https://fr.freepik.com/vecteurs-libre/collection-icones-plat-menage-paysan-ferme-animaux-domestiques_3910295.htm#fromView=search&page=1&position=12&uuid=70c42894-1669-495a-8220-e5702fba3c57
import GoatFarmIcon from "../assets/freepick/other/goat.svg"; //https://fr.freepik.com/vecteurs-libre/ensemble-differentes-tetes-chevre-blanches_27289500.htm#fromView=search&page=2&position=24&uuid=2767bc54-d0dd-4856-916c-43d6df8ba613
import BeekeepingIcon from "../assets/freepick/other/honey_pot.svg"; //https://fr.freepik.com/vecteurs-libre/icones-apiculture-du-miel-abeilles-dessines-main-nourriture-sucree-insecte-cellule-tonneau-nid-abeille_10600430.htm#fromView=search&page=1&position=25&uuid=3c4958fc-937d-4f5e-bc25-c81143809c32
import IceCreameryIcon from "../assets/freepick/other/ice_cream.svg"; //https://fr.freepik.com/vecteurs-libre/icones-nourriture_959688.htm#fromView=search&page=1&position=34&uuid=d939a2b9-cbc5-4a60-8b6d-e053da9e860d
import PressIcon from "../assets/freepick/other/juice_pitcher.svg"; //https://fr.freepik.com/vecteurs-libre/dessines-main-fruits-agreable-jus-caracteres_891128.htm#fromView=search&page=1&position=5&uuid=74f413b5-28a6-4cc5-b734-066959171f71
import ConfectioneryIcon from "../assets/freepick/other/lollipop.svg"; //https://fr.freepik.com/vecteurs-libre/icones-nourriture_959688.htm#fromView=search&page=1&position=34&uuid=d939a2b9-cbc5-4a60-8b6d-e053da9e860d
import FlourMillIcon from "../assets/freepick/other/mill.svg"; //https://fr.freepik.com/vecteurs-libre/collection-icones-plat-menage-paysan-ferme-animaux-domestiques_3910295.htm#fromView=search&page=1&position=12&uuid=70c42894-1669-495a-8220-e5702fba3c57
import OilMillIcon from "../assets/freepick/other/oil_bottle.svg"; //https://www.freepik.com/free-vector/condiments-icon-set_1294531.htm#fromView=search&page=1&position=0&uuid=78d47865-8ef9-4a3b-883b-5a92da7801c5
import ProducerIcon from "../assets/freepick/other/producer.svg"; //https://fr.freepik.com/vecteurs-libre/collection-icones-plat-menage-paysan-ferme-animaux-domestiques_3910295.htm#fromView=search&page=1&position=12&uuid=70c42894-1669-495a-8220-e5702fba3c57
import FruitProducerIcon from "../assets/freepick/other/producer_apple.svg"; //https://fr.freepik.com/vecteurs-libre/collection-icones-plat-menage-paysan-ferme-animaux-domestiques_3910295.htm#fromView=search&page=1&position=12&uuid=70c42894-1669-495a-8220-e5702fba3c57 & basics icons
import BeverageProducerIcon from "../assets/freepick/other/producer_beverage.svg"; //https://fr.freepik.com/vecteurs-libre/collection-icones-plat-menage-paysan-ferme-animaux-domestiques_3910295.htm#fromView=search&page=1&position=12&uuid=70c42894-1669-495a-8220-e5702fba3c57 & basics icons
import AnimalProducerIcon from "../assets/freepick/other/producer_chicken.svg"; //https://fr.freepik.com/vecteurs-libre/collection-icones-plat-menage-paysan-ferme-animaux-domestiques_3910295.htm#fromView=search&page=1&position=12&uuid=70c42894-1669-495a-8220-e5702fba3c57 & basics icons
import CerealFarmIcon from "../assets/freepick/other/scarecrow.svg"; //https://fr.freepik.com/vecteurs-libre/collection-icones-plat-menage-paysan-ferme-animaux-domestiques_3910295.htm#fromView=search&page=1&position=12&uuid=70c42894-1669-495a-8220-e5702fba3c57
import DistilleryIcon from "../assets/freepick/other/scent_bottle.svg"; //https://fr.freepik.com/vecteurs-libre/elements-bien-etre-spa-dessines-main_40032821.htm#fromView=search&page=1&position=22&uuid=98a95de0-e76b-451d-8595-fe57c8715fe1
import NurseryIcon from "../assets/freepick/other/shrub.svg"; //https://www.freepik.com/free-vector/cute-plant-pot-cartoon-vector-icon-illustration-nature-object-icon-concept-isolated-flat-vector_68184327.htm#fromView=search&page=1&position=18&uuid=d287c65f-a13e-4d76-8aff-62d6632ebea7
import HelicicultureIcon from "../assets/freepick/other/snail.svg"; //https://fr.freepik.com/vecteurs-libre/colore-escargots-collection_933797.htm#fromView=search&page=1&position=1&uuid=22cd49ef-007e-4d7a-b12e-b1bed8cc2536
import TransformerIcon from "../assets/freepick/other/transformer.svg"; //https://fr.freepik.com/vecteurs-libre/fleches-cycle-contour-boulon-plat_230292208.htm#fromView=search&page=2&position=38&uuid=be6c8680-69b8-4c0d-a290-8bd8693cd193
import WholeSalerIcon from "../assets/freepick/other/truck.svg"; //https://fr.freepik.com/vecteurs-libre/e-commerce-objets-plats_957273.htm#fromView=search&page=1&position=0&uuid=20dbfe86-398c-4c0e-97fd-58bc06e1690e

export const activityIcons = {
  bakery: <BakeryIcon style={{ width: "1.8rem" }} />,
  butcher_shop: <ButcherShopIcon style={{ width: "1.8rem" }} />,
  beekeeping: <BeekeepingIcon style={{ width: "1.8rem" }} />,
  biscuit_factory: <BiscuitFactoryIcon style={{ width: "1.8rem" }} />,
  brewery: <BreweryIcon style={{ width: "1.8rem" }} />,
  wine_merchant: <WineMerchantIcon style={{ width: "1.8rem" }} />,
  cured_meat_shop: <CuredMeatShopIcon style={{ width: "1.8rem" }} />,
  chocolate_factory: <ChocolateFactoryIcon style={{ width: "1.8rem" }} />,
  confectionery: <ConfectioneryIcon style={{ width: "1.8rem" }} />,
  farm: <FarmIcon style={{ width: "1.8rem" }} />,
  dairy_farm: <DairyFarmIcon style={{ width: "1.8rem" }} />,
  poultry_breeding: <PoultryBreedingIcon style={{ width: "1.8rem" }} />,
  cheese_dairy: <CheeseDairyIcon style={{ width: "1.8rem" }} />,
  ice_creamery: <IceCreameryIcon style={{ width: "1.8rem" }} />,
  cereal_farm: <CerealFarmIcon style={{ width: "1.8rem" }} />,
  market_garden: <MarketGardenIcon style={{ width: "1.8rem" }} />,
  market: <MarketIcon style={{ width: "1.8rem" }} />,
  flour_mill: <FlourMillIcon style={{ width: "1.8rem" }} />,
  fish_shop: <FishShopIcon style={{ width: "1.8rem" }} />,
  producer: <ProducerIcon style={{ width: "1.8rem" }} />,
  florist: <FloristIcon style={{ width: "1.8rem" }} />,
  animal_producer: <AnimalProducerIcon style={{ width: "1.8rem" }} />,
  beverage_producer: <BeverageProducerIcon style={{ width: "1.8rem" }} />,
  fruit_producer: <FruitProducerIcon style={{ width: "1.8rem" }} />,
  caterer: <CatererIcon style={{ width: "1.8rem" }} />,
  orchard: <OrchardIcon style={{ width: "1.8rem" }} />,
  vineyard: <VineyardIcon style={{ width: "1.8rem" }} />,
  grocery_store: <GroceryStoreIcon style={{ width: "1.8rem" }} />,
  goat_farm: <GoatFarmIcon style={{ width: "1.8rem" }} />,
  cooperative: <CooperativeFarmIcon style={{ width: "1.8rem" }} />,
  creamery: <GroceryStoreIcon style={{ width: "1.8rem" }} />,
  distillery: <DistilleryIcon style={{ width: "1.8rem" }} />,
  poultry_breeding_eggs: (
    <PoultryBreedingEggsIcon style={{ width: "1.8rem" }} />
  ),
  meat_farm: <MeatFarmIcon style={{ width: "1.8rem" }} />,
  wholesaler: <WholeSalerIcon style={{ width: "1.8rem" }} />,
  heliculture: <HelicicultureIcon style={{ width: "1.8rem" }} />,
  non_edible_horticulture: (
    <NonEdibleHorticultureIcon style={{ width: "1.8rem" }} />
  ),
  oil_mill: <OilMillIcon style={{ width: "1.8rem" }} />,
  nursery: <NurseryIcon style={{ width: "1.8rem" }} />,
  fish_farm: <FishFarmIcon style={{ width: "1.8rem" }} />,
  press: <PressIcon style={{ width: "1.8rem" }} />,
  aromatic_herb_producer: (
    <AromaticHerbProducerIcon style={{ width: "1.8rem" }} />
  ),
  roaster: <RoasterIcon style={{ width: "1.8rem" }} />,
  transformer: <TransformerIcon style={{ width: "1.8rem" }} />,
  other: <OtherIcon style={{ width: "1.8rem" }} />,
};
