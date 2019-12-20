const { Machine, interpret } = XState;

const promiseMachine = Machine({
	id: "promise",
	initial: "pending",
	states: {
		pending: {
			on: {
				RESOLVE: "resolved",
				REJECT: "rejected"
			}
		},
		resolved: {
			type: "final"
		},
		rejected: {
			type: "final"
		}
	}
});

const promiseService = interpret(promiseMachine).onTransition(state =>
	console.log(state.value)
);

function App() {
	promiseService.start();
	setTimeout(() => promiseService.send("RESOLVE"), 2000);
	return <div className='App'></div>;
}

ReactDOM.render(<App />, document.getElementById("root"));
