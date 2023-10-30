
export default class ManageRepository{

    getAddUserBtn(){
        return cy.getBySel("addUserbtn")
    }

    getUserEmailField(){
        return cy.getBySel("manageEmail")
    }
    getUserIsOwnerCheckbox(){
        return cy.get(".inputCheckbox")
    }
    getSubmitBtn(){
        return cy.getBySel("addUserConfirm");
    }
    getUpdateBtn(){
        return cy.getBySel("updateUser");
    }
    getUserRows(){
        return cy.get(".tableRow");
    }
    getDeleteConfirmBtn(){
        return cy.getBySel("deleteConfirm");
    }
}