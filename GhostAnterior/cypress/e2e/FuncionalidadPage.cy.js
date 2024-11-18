

const ghostVersion = Cypress.env('GHOST_VERSION');
const ghostPort = Cypress.env('GHOST_PORT');

describe('Tester de funcionalidad page', () => {
    beforeEach(() => {
        cy.fixture('userLogin.json').then((user) => {
            cy.visit(user.loginPage)
        })
    })
    it('E0007 Creando Page con titulo y contenido', () => {
        cy.fixture('userLogin.json').then((user) => {
            cy.get('#identification').type(user.email)
            cy.get('#password').type(user.password)
            cy.get('button[data-test-button="sign-in"]').click()
            cy.wait(1500)
            cy.url().should('include', '/dashboard')

            cy.get('a[data-test-nav="pages"]').click()
            cy.wait(1500)
            cy.url().should('include', '/pages')

            cy.get('a[data-test-new-page-button]').click()
            cy.wait(1500)
            cy.url().should('include', '/editor/page')

            cy.fixture('pagesData.json').then((page) => {
                cy.get('textarea[data-test-editor-title-input]').type(page.pageTitle)
                cy.get('div[data-lexical-editor="true"]').first().type(page.contenido)
                cy.get('button[data-test-button="publish-flow"]').first().click()
                cy.get('button[data-test-button="continue"]').click()
                cy.wait(500)
                cy.get('button[data-test-button="confirm-publish"]').click()
                cy.get('button[data-test-button="close-publish-flow"]').click()
                cy.wait(500)
                cy.url().should('include', '/pages')
                //verificar creacion
                cy.contains('h3', page.pageTitle).should('exist')
            })

            cy.screenshot(`${ghostVersion}/nueva-page`)
        })
    })

    it('E0008 Creando Page con titulo y sin contenido', () => {
        cy.fixture('userLogin.json').then((user) => {
            cy.get('#identification').type(user.email)
            cy.get('#password').type(user.password)
            cy.get('button[data-test-button="sign-in"]').click()
            cy.wait(1500)
            cy.url().should('include', '/dashboard')

            cy.get('a[data-test-nav="pages"]').click()
            cy.wait(1500)
            cy.url().should('include', '/pages')

            cy.get('a[data-test-new-page-button]').click()
            cy.wait(1500)
            cy.url().should('include', '/editor/page')

            cy.fixture('pagesData.json').then((page) => {
                cy.get('textarea[data-test-editor-title-input]').type(page.pageTitle2)
                cy.get('div[data-lexical-editor="true"]').first().focus()
                cy.wait(500)
                cy.get('button[data-test-button="publish-flow"]').first().click()
                cy.get('button[data-test-button="continue"]').click()
                cy.wait(500)
                cy.get('button[data-test-button="confirm-publish"]').click()
                cy.get('button[data-test-button="close-publish-flow"]').click()
                cy.wait(500)
                cy.url().should('include', '/pages')
                //verificar creacion
                cy.contains('h3', page.pageTitle2).should('exist')
            })

            cy.screenshot(`${ghostVersion}/nueva-page`)
        })
    })
})