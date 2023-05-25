import { faker, th } from '@faker-js/faker';

describe('testMagento', () => {
  
  it('Accéder aux tops', () => {
   
      cy.visit('https://magento.softwaretestingboard.com/')
      cy.intercept({
        url:'https://magento.softwaretestingboard.com/customer/section/load/*',
        method : 'GET',
    }).as('waitToAddCart');
    // cy.get('.panel > .header > :nth-child(3) > a').click()


    cy.get('#ui-id-4 > :nth-child(2)').trigger('mouseover') // survol de l'onglet "woman"
    cy.get('#ui-id-9').click() // click sur "tops"

    

    // séléctionne le premier top
    cy.get(':nth-child(1) > .product-item-info > .photo > .product-image-container > .product-image-wrapper > .product-image-photo').click()
    
    cy.get('#option-label-size-143-item-166').click() //séléctionne la taille XS
    cy.get('#option-label-color-93-item-57').click() // séléctionne la couleur "rose"
    cy.get('#product-addtocart-button').click() // ajouter le produit au panier
    cy.wait('@waitToAddCart');
    // Consulte le panier
    cy.get('.showcart').click();
    cy.wait(1000);
    cy.get('#top-cart-btn-checkout').click({'force' : true}); // séléctionner “proceed to checkout”
    // Modifie la quantité du produit
    cy.get('.control.qty > input').clear().type('2'); // modifie la quantité à 2
    cy.get('.update-cart-item').click(); // clique sur le bouton de mise à jour
    cy.wait(500);
  })
})