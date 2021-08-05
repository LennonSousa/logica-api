import Project from '../models/ProjectsModel';
import userView from './userView';
import statusView from './projectStatusView';
import projectEventView from './projectEventView';
import projectAttachmentRequiredView from './projectAttachmentRequiredView';
import projectAttachmentView from './projectAttachmentView';

export default {
    render(project: Project) {
        return {
            id: project.id,
            customer: project.customer,
            document: project.document,
            phone: project.phone,
            cellphone: project.cellphone,
            contacts: project.contacts,
            email: project.email,
            zip_code: project.zip_code,
            street: project.street,
            number: project.number,
            neighborhood: project.neighborhood,
            complement: project.complement,
            city: project.city,
            state: project.state,
            coordinates: project.coordinates,
            capacity: project.capacity,
            inversor: project.inversor,
            roof_orientation: project.roof_orientation,
            roof_type: project.roof_type,
            price: project.price,
            seler: project.seler,
            notes: project.notes,
            financier_same: project.financier_same,
            financier: project.financier,
            financier_document: project.financier_document,
            financier_rg: project.financier_rg,
            financier_cellphone: project.financier_cellphone,
            financier_email: project.financier_email,
            financier_zip_code: project.financier_zip_code,
            financier_street: project.financier_street,
            financier_number: project.financier_number,
            financier_neighborhood: project.financier_neighborhood,
            financier_complement: project.financier_complement,
            financier_city: project.financier_city,
            financier_state: project.financier_state,
            created_by: project.created_by,
            created_at: project.created_at,
            updated_by: project.updated_by,
            updated_at: project.updated_at,
            status: project.status && statusView.render(project.status),
            seller_id: project.seller_id && userView.render(project.seller_id),
            events: project.events ? projectEventView.renderMany(project.events) : [],
            attachmentsRequired: project.attachmentsRequired ? projectAttachmentRequiredView.renderMany(project.attachmentsRequired) : [],
            attachments: project.attachments ? projectAttachmentView.renderMany(project.attachments) : [],
        }
    },

    renderMany(projects: Project[]) {
        return projects.map(project => this.render(project));
    }
}