type DescriptionProp = { product: Product };

const Description = ({ product }: DescriptionProp) => {
  return (
    <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* Left description details */}
      <main className="space-y-4 lg:col-span-2">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
          Product Description
        </h3>
        <p className="text-sm leading-relaxed text-pretty text-neutral-600 dark:text-neutral-400">
          {product.description}
        </p>

        <main className="mt-6 space-y-2 rounded-2xl border border-neutral-200/50 bg-white p-5 dark:border-neutral-800/40 dark:bg-neutral-900/20">
          <h4 className="text-xs font-extrabold tracking-wider text-neutral-400 uppercase">
            Additional Meta Specs
          </h4>

          <div className="mt-3 grid grid-cols-2 gap-4 text-xs">
            <MetaData name="SKU Code" value={product.sku} />
            <MetaData name="Barcode" value={product.meta.barcode} />
          </div>
        </main>
      </main>

      {/* Physical specifications panel */}
      <main className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900/40">
        <h3 className="text-sm font-bold tracking-wider text-neutral-400 uppercase dark:text-neutral-500">
          Dimensions & Weight
        </h3>

        <main className="mt-4 space-y-3.5 divide-y divide-neutral-100 text-sm dark:divide-neutral-800">
          <DimensionsItem name="Weight" value={`${product.weight} kg`} />
          <DimensionsItem
            name="Width"
            value={`${product.dimensions.width} cm`}
          />
          <DimensionsItem
            name="Height"
            value={`${product.dimensions.height} cm`}
          />
          <DimensionsItem
            name="Depth"
            value={`${product.dimensions.depth} cm`}
          />
        </main>
      </main>
    </section>
  );
};

export default Description;

type MetaDataProp = { name: string; value: string };
const MetaData = ({ name, value }: MetaDataProp) => {
  return (
    <div>
      <span className="text-neutral-400 capitalize">{name}:</span>
      <p className="mt-0.5 font-semibold text-neutral-900 dark:text-white">
        {value}
      </p>
    </div>
  );
};

const DimensionsItem = ({ name, value }: MetaDataProp) => {
  return (
    <div className="flex justify-between py-1">
      <span className="text-neutral-500 capitalize dark:text-neutral-400">
        {name}
      </span>
      <span className="font-bold text-neutral-900 dark:text-white">
        {value}
      </span>
    </div>
  );
};
