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
        // ação referenciada via string
        entry: "alertGreen"
      },
      yellow: {},
      red: {}
    }
  },
  {
    actions: {
      // implementação da ação
      alertGreen: (context, event) => {
        alert("Green!");
      }
    },
    activities: {},
    guards: {},
    services: {}
  }
);

const noAlertLightMachine = lightMachine.withConfig({
  actions: {
    // implementação da ação
    alertGreen: (context, event) => {
      console.log("Green!");
    }
  }
});

const testLightMachine = lightMachine.withContext({
  // merge com contexto original
  ...lightMachine.context,
  elapsed: 1000
});

const handleTransition = state => {
  console.log("Objeto state: ", state);
  console.log("Estado atual: " + state.value);
  console.log("Contexto do estado: ", state.context);
  console.log("Ação do estado: " + state.actions[0].exec);
};

const lightService = interpret(lightMachine).onTransition(handleTransition);
const noAlertLighService = interpret(noAlertLightMachine).onTransition(handleTransition);
const testeLightService = interpret(testLightMachine).onTransition(handleTransition);

function App() {
  lightService.start();
  noAlertLighService.start();
  testeLightService.start();

  return <div className="App"></div>;
}

ReactDOM.render(<App />, document.getElementById("root"));
