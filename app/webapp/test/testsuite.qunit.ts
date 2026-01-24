import type {SuiteConfiguration} from "sap/ui/test/starter/config";
export default {
	name: "QUnit test suite for the UI5 Application: climberioui",
	defaults: {
		page: "ui5://test-resources/climberioui/Test.qunit.html?testsuite={suite}&test={name}",
		qunit: {
			version: 2
		},
		sinon: {
			version: 4
		},
		ui5: {
			language: "EN",
			theme: "sap_horizon"
		},
		coverage: {
			only: ["climberioui/"],
			never: ["test-resources/climberioui/"]
		},
		loader: {
			paths: {
				"climberioui": "../"
			}
		}
	},
	tests: {
		"unit/unitTests": {
			title: "Unit tests for climberioui"
		},
		"integration/opaTests": {
			title: "Integration tests for climberioui"
		}
	}
} satisfies SuiteConfiguration;