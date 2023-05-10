class AgendaApp {
  api;
  agenda;

  constructor() {
    this.api = new Api();
    this.api.getData().then((result) => {});
    this.agenda = new Agenda();
  }
}

class Api {
  dataFromApi = [];

  async getData() {
    await fetch("../data/data.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.dataFromApi = data.months;
      });
    return this.dataFromApi;
  }
}

class Agenda {
  renderer;
  header;
  month;

  constructor() {
    this.renderer = new Renderer();
    this.header = new Header();
    this.month = new Month(this);
  }
}

class Renderer {}

class Header {}

class Month {
  days = [];
  agenda;

  constructor(agenda) {
    this.agenda = agenda;
    for (let i = 0; i < 31; i++) {
      this.days.push(new Day(this));
    }
  }
}

class Day {
  month;
  constructor(month) {
    this.month = month;
  }
}

const vladsAgenda = new AgendaApp();
