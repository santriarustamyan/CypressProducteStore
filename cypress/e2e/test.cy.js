import helper from "../support/helper"

describe('network', () => {
    before(() => {
        cy.intercept("https://api.demoblaze.com/view").as("view")
        cy.visit("https://demoblaze.com")
    })

    it('addToCart', () => {
        cy.wait(1000)
        cy.getCookie("user").then((c) => {
            let cookie = "user=" + c.value.toString();
            cy.request({
                method: "POST",
                url: "https://api.demoblaze.com/addtocart",
                body: {
                    cookie: cookie,
                    flag: false,
                    id: helper.generateId(),
                    prod_id: 1
                }
            })
        })
        cy.contains("Cart").click()
        cy.wait("@view")
        cy.get("#totalp").then(price => {
            expect(price.text()).to.be.equal("360");
        })
    })
})
