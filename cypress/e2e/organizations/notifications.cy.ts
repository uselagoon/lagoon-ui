import NotificationsAction from "cypress/support/actions/organizations/NotificationsAction";

const notifications = new NotificationsAction();

describe("Org Notifications page", ()=>{

    beforeEach(() => {
        cy.login(Cypress.env().CY_EMAIL, Cypress.env().CY_PASSWORD);
        cy.visit(`${Cypress.env().CY_URL}/organizations/84/notifications`);
      });

      it("Add Slack notification",()=>{
        
        notifications.doAddNotification("slack");

      })
      it("Add Rocketchat notification",()=>{
        
        notifications.doAddNotification("rocketChat");

      })
      it("Add Teams notification",()=>{
        
        notifications.doAddNotification("teams");

      })
      it("Add Email notification",()=>{
        
        notifications.doAddNotification("email");

      })
      it("Add Webhook notification",()=>{

        notifications.doAddNotification("webhook");

      })

      it("Edit notification", ()=>{

        notifications.doEditNotification();
      });

      it("Delete notification", ()=>{
        
        notifications.doDeleteNotification();
      });

});