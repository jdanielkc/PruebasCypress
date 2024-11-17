import { faker } from '@faker-js/faker';

describe('Tester de funcionalidad Page', () => {
    beforeEach(() => {
        cy.fixture('userLogin.json').then((user) => {
            cy.visit(user.loginPage)
        })
    })
    it('Creando un nuevo miembro', () => {
        cy.fixture('userLogin.json').then((user) => {
            cy.get('#identification').type(user.email)
            cy.get('#password').type(user.password)
            cy.get('button[data-test-button="sign-in"]').click()
            cy.wait(1500)
            cy.url().should('include', '/dashboard')

            cy.get('a[data-test-nav="members"]').click()
            cy.wait(1500)
            cy.url().should('include', '/members')

            cy.get('a[data-test-new-member-button]').click()
            cy.wait(1500)
            cy.url().should('include', '/members/new')
            let memberName = faker.person.fullName()
            cy.get('input[data-test-input="member-name"]').type(memberName)
            cy.get('input[data-test-input="member-email"]').type(faker.internet.email())
            cy.get('input.ember-power-select-trigger-multiple-input').type(faker.word.verb() + '{enter}')

            cy.get('button[data-test-button="save"]').click()
            cy.get('a[data-test-nav="members"]').click()
            cy.wait(1500)
            //verificar creación
            cy.contains('h3', memberName).should('exist')
        })
    })
    it('Eliminando un miembro', () => {
        cy.fixture('userLogin.json').then((user) => {
            cy.get('#identification').type(user.email)
            cy.get('#password').type(user.password)
            cy.get('button[data-test-button="sign-in"]').click()
            cy.wait(1500)
            cy.url().should('include', '/dashboard')

            cy.get('a[data-test-nav="members"]').click()
            cy.wait(1500)
            cy.url().should('include', '/members')

            cy.get('table tbody tr').then(($filas) => {
                const filasAntes = $filas.length
                cy.wrap(filasAntes).as('filasAntes')
            })


            cy.get('a[data-test-table-data="details"]').first().click()
            cy.wait(1500)

            cy.get('button[data-test-button="member-actions"]').click()
            cy.get('button[data-test-button="delete-member"]').click()
            cy.get('button[data-test-button="confirm"]').click()
            cy.url().should('include', '/members')

            cy.get('table tbody tr').then(($filas) => {
                const filasDespues = $filas.length
                cy.wrap(filasDespues).as('filasDespues')
            })

            // Verificar que el numero de filas despues sea el numero de filas antes - 1
            cy.get('@filasAntes').then((filasAntes) => {
                cy.get('@filasDespues').then((filasDespues) => {
                    expect(filasDespues).to.equal(filasAntes - 1)
                })
            })


        })
    })
})