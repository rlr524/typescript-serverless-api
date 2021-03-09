import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
	service: "typescript-serverless-api",
	frameworkVersion: "2",
	custom: {
		webpack: {
			webpackConfig: "./webpack.config.js",
			includeModules: true,
		},
	},
	plugins: ["serverless-webpack"],
	provider: {
		name: "aws",
		runtime: "nodejs14.x",
		profile: "serverlessUser",
		region: "us-west-2",
		apiGateway: {
			minimumCompressionSize: 1024,
			shouldStartNameWithService: true,
		},
		environment: {
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
		},
		lambdaHashingVersion: "20201221",
		iamRoleStatements: [
			{
				Effect: "Allow",
				Action: ["translate:*"],
				Resource: "*",
			},
		],
	},
	// import the function via paths
	functions: {
		getCityInfo: {
			handler: "lambdas/getCityInfo.handler",
			events: [
				{
					http: {
						path: "get-city/{city}",
						method: "GET",
						cors: true,
					},
				},
			],
		},
		translate: {
			handler: "lambdas/translate.handler",
			events: [
				{
					http: {
						path: "translate",
						method: "POST",
						cors: true,
					},
				},
			],
		},
	},
};

module.exports = serverlessConfiguration;
