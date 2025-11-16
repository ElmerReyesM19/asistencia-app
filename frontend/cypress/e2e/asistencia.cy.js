describe('Módulo de Asistencia', () => {
  it('Carga la pantalla correctamente', () => {
    cy.visit("/asistencia");
    cy.contains("Registro de Asistencia");
    cy.get("button").contains("Entrada");
    cy.get("button").contains("Salida");
  });

  it('No permite registrar sin QR', () => {
    cy.visit("/asistencia");
    cy.contains("Registrar Asistencia").click();
    cy.contains("Escanee un código QR primero");
  });
});
