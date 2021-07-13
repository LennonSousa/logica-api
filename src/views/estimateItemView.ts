import EstimateItem from '../models/EstimateItemsModel';

export default {
    render(estimateItem: EstimateItem) {
        return {
            id: estimateItem.id,
            name: estimateItem.name,
            amount: estimateItem.amount,
            price: estimateItem.price,
            order: estimateItem.order,
        }
    },

    renderMany(estimateItems: EstimateItem[]) {
        const estimateItemsSorted = estimateItems.sort((a, b) => a.order - b.order);

        return estimateItemsSorted.map(estimateItem => this.render(estimateItem));
    }
}