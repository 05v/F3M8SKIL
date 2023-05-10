class AgendaApp {
  api;
  agenda;

  constructor() {
    this.api = new Api();
    this.agenda = new Agenda();
  }
}

class Api {}

class Agenda {
  renderer;
  header;
  month;

  constructor() {
    this.renderer = new Renderer();
    this.header = new Header();
    this.month = new Month();
  }
}

class Renderer {}

class Header {}

class Month {
  days = [];
  constructor() {
    for (let i = 0; i < 31; i++) {
      this.days.push(new Day());
    }
  }
}

class Day {}

const vladsAgenda = new AgendaApp();
console.log(vladsAgenda);
