import { getTranslations } from 'next-intl/server';
import enDict from '@/assets/international/en/dictionary.json';
import zhTWDict from '@/assets/international/zh-TW/dictionary.json';
import dictionaryKeys from './dictionary.data.json';
import dictionaryClass from './Dictionary.module.scss';
import NavBar from './NavBar/NavBar';
import SectionHeading from '@/components/ui/SectionHeading';

const { keyList } = dictionaryKeys;

const filteredKeys = keyList.filter((key) => /^[a-zA-Z]/.test(key));

const navLetters = [...new Set(filteredKeys.map((key) => key.charAt(0).toUpperCase()))].sort();

/** Group keys by their first letter for semantic HTML structure. */
const groupedByLetter = filteredKeys.reduce<Record<string, string[]>>((acc, key) => {
  const letter = key.charAt(0).toUpperCase();
  (acc[letter] ??= []).push(key);
  return acc;
}, {});

type CategoryKey = keyof typeof enDict.categories;

const CATEGORY_CLASS_BY_KEY: Record<CategoryKey, string> = {
  abbreviations: dictionaryClass.categoryAbbreviations,
  agriculture_perishables: dictionaryClass.categoryAgriculturePerishables,
  air_freight: dictionaryClass.categoryAirFreight,
  air_freight_parcel: dictionaryClass.categoryAirFreightParcel,
  automotive_manufacturing: dictionaryClass.categoryAutomotiveManufacturing,
  charges_fees: dictionaryClass.categoryChargesFees,
  cold_chain_pharma: dictionaryClass.categoryColdChainPharma,
  compliance_safety: dictionaryClass.categoryComplianceSafety,
  customs_compliance: dictionaryClass.categoryCustomsCompliance,
  documents: dictionaryClass.categoryDocuments,
  ecommerce_retail: dictionaryClass.categoryEcommerceRetail,
  equipment: dictionaryClass.categoryEquipment,
  freight_forwarding: dictionaryClass.categoryFreightForwarding,
  hazmat_chemicals: dictionaryClass.categoryHazmatChemicals,
  incoterms: dictionaryClass.categoryIncoterms,
  legal_finance: dictionaryClass.categoryLegalFinance,
  legal_regulatory: dictionaryClass.categoryLegalRegulatory,
  logistics_models: dictionaryClass.categoryLogisticsModels,
  logistics_tech: dictionaryClass.categoryLogisticsTech,
  maritime_inland: dictionaryClass.categoryMaritimeInland,
  maritime_ocean: dictionaryClass.categoryMaritimeOcean,
  measurement: dictionaryClass.categoryMeasurement,
  ocean_freight: dictionaryClass.categoryOceanFreight,
  ports_terminals: dictionaryClass.categoryPortsTerminals,
  supply_chain_management: dictionaryClass.categorySupplyChainManagement,
  warehousing_inland: dictionaryClass.categoryWarehousingInland,
};

// Static style references keep every category class in the server-side CSS Module export.
const CATEGORY_CLASS_BY_DISPLAY: Record<string, string> = Object.fromEntries(
  [...Object.entries(enDict.categories), ...Object.entries(zhTWDict.categories)].map(
    ([key, display]) => [display, CATEGORY_CLASS_BY_KEY[key as CategoryKey]]
  )
);

const Dictionary = async () => {
  const translateDictionary = await getTranslations('dictionary');
  const translateMetadata = await getTranslations('Metadata');
  return (
    <>
      <SectionHeading level={1} className={dictionaryClass['dictionaryTitle']}>
        {translateMetadata('dictionary.title')}
      </SectionHeading>
      <NavBar navLetters={navLetters} />
      <div className={dictionaryClass['dictionaryContent']}>
        {navLetters.map((letter) => (
          <section key={letter} className={dictionaryClass['dictionarySection']}>
            <h2 id={letter}>{letter}</h2>
            <ul className={dictionaryClass['dictionaryList']}>
              {groupedByLetter[letter].map((key) => (
                <li key={key} className={dictionaryClass['dictionaryItem']}>
                  <h3>{translateDictionary(`${key}.term`)}</h3>
                  <div className={dictionaryClass['dictionaryCategoryWrapper']}>
                    {(() => {
                      const category = translateDictionary.raw(`${key}.category`) as string;
                      return (
                        <span
                          className={[
                            dictionaryClass['dictionaryCategory'],
                            CATEGORY_CLASS_BY_DISPLAY[category],
                          ].join(' ')}
                        >
                          {category}
                        </span>
                      );
                    })()}
                  </div>
                  <p className={dictionaryClass['dictionaryDefinition']}>
                    {translateDictionary(`${key}.definition`)}
                  </p>
                  <ul className={dictionaryClass['dictionaryRelatedTerms']}>
                    {(translateDictionary.raw(`${key}.relatedTerms`) as string[]).map((term) => (
                      <li key={term}>
                        <i>#{term.trim().replace(' ', '_')}</i>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
};

export default Dictionary;
