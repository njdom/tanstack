import { eq, gte, ilike, inArray, lte, Query, QueryBuilder } from '@tanstack/react-db';
import { productsCollection } from './products.db';
import { SearchState } from '../store/search.store';
import { Product } from '@/types';

type ProductQuery = QueryBuilder<{
  baseSchema: { product: Product };
  schema: { product: Product };
  fromSourceName: 'product';
  hasJoins: false;
}>;

export class ProductQueryBuilder {
  constructor(private readonly state: SearchState) {}

  build(): ProductQuery {
    const base = new Query().from({ product: productsCollection });
    return this.applySort(this.applyFilters(base));
  }

  private applyFilters(productQuery: ProductQuery): ProductQuery {
    const { searchTerm, selectedCategory, selectedBrands, priceRange, showOutOfStock, minRating } = this.state;

    if (searchTerm)
      productQuery = productQuery.where(({ product }) => ilike(product.name, `%${searchTerm}%`));
    if (selectedCategory)
      productQuery = productQuery.where(({ product }) => eq(product.category, selectedCategory));
    if (selectedBrands.length > 0)
      productQuery = productQuery.where(({ product }) => inArray(product.brand, selectedBrands));
    if (priceRange.min)
      productQuery = productQuery.where(({ product }) => gte(product.price, priceRange.min));
    if (priceRange.max)
      productQuery = productQuery.where(({ product }) => lte(product.price, priceRange.max));
    if (!showOutOfStock)
      productQuery = productQuery.where(({ product }) => eq(product.inStock, true));
    if (minRating)
      productQuery = productQuery.where(({ product }) => gte(product.rating, minRating));

    return productQuery;
  }

  private applySort(result: ProductQuery): ProductQuery {
    const sortFns = {
      priceAsc: () => result.orderBy(({ product }) => product.price, 'asc'),
      priceDesc: () => result.orderBy(({ product }) => product.price, 'desc'),
      rating: () => result.orderBy(({ product }) => product.rating, 'desc'),
      name: () => result.orderBy(({ product }) => product.name),
    } satisfies Record<SearchState['sortBy'], () => ProductQuery>;

    return sortFns[this.state.sortBy]();
  }
}
