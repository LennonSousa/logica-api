import ProjectItem from '../models/ProjectItemsModel';

export default {
    render(projectItem: ProjectItem) {
        return {
            id: projectItem.id,
            name: projectItem.name,
            amount: projectItem.amount,
            price: projectItem.price,
            percent: projectItem.percent,
            order: projectItem.order,
        }
    },

    renderMany(projectItems: ProjectItem[]) {
        const projectItemsSorted = projectItems.sort((a, b) => a.order - b.order);

        return projectItemsSorted.map(projectItem => this.render(projectItem));
    }
}