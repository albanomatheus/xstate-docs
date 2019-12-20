const { Machine, interpret } = XState;

const lightMachine = Machine(
  {
    // Identificador da máquina de estados
    id: "light",

    // Estado inicial
    initial: "green",

    // Variáveis locais para toda maquina de estado
    context: {
      elapsed: 0,
      direction: "east"
    },

    // Definição dos estados
    states: {
      green: {
        // Ação referenciada via string
        entry: "alertGreen",

        // Eventos para troca de estado
        on: {
          TIMER: "yellow",
          EMERGENCY: "red"
        }
      },
      yellow: {},
      red: {
        type: "final"
      }
    }
  },
  {
    actions: {
      // implementação da ação
      alertGreen: (context, event) => {
        console.log("Green!");
      }
    },
    activities: {},
    guards: {},
    services: {}
  }
);

function App() {
  const { initialState } = lightMachine;

  // NextEvents
  console.log("Next Events: ", initialState.nextEvents);

  // Changed
  console.log("Changed");
  console.log("Initial state: ", initialState.changed);
  const nextState = lightMachine.transition(initialState, "TIMER");
  console.log("Next state:", nextState.changed);
  const unchangedState = lightMachine.transition(nextState, "UNKNOWN_EVENT");
  console.log("", unchangedState.changed);

  // Done
  const redState = lightMachine.transition(initialState, "EMERGENCY");
  console.log("Check if green state is final:", initialState.done);
  console.log("Check if red state is final:", redState.done);

  return <div className="App"></div>;
}

ReactDOM.render(<App />, document.getElementById("root"));
