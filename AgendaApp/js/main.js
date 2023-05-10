class AgendaApp {
  api;
  agenda;

  constructor() {
    this.api = new Api();
    this.api.getData().then((result) => {
      this.agenda = new Agenda(result[0]);
    });
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
  data;

  constructor(data) {
    this.data = data;
    console.log(this.data);
    this.renderer = new Renderer();
    this.header = new Header(this.data.name);
    this.month = new Month(this, this.data.days);
  }
}

class Renderer {}

class Header {
  nameOfMonth;
  constructor(nameOfMonth) {
    this.nameOfMonth = nameOfMonth;
  }
}

class Month {
  days = [];
  agenda;
  numberOfDays;

  constructor(agenda, numberOfDays) {
    this.agenda = agenda;
    this.numberOfDays = numberOfDays;
    for (let i = 0; i < this.numberOfDays; i++) {
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
console.log(vladsAgenda);
