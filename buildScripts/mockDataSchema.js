export const schema = {
	"type": "object",
	"properties":
	{
					"users":
					{
									"type": "array",
									"minItems": 10,
									"maxItems": 20,
									"items":
									{
													"type": "object",
													"properties":
													{
														"id":
														{
																		"type": "number",
																		"unique": true,
																		"minimum": 1
														},
																	"name":
																	{
																					"type": "string",
																					"faker": "name.findName"
																	},
																	"photo":
																	{
																					"type": "string",
																					"faker": "image.avatar"
																	},
															//		"email":
																	//{
																			//		"type": "string",
																					//"faker": "internet.email"
																//	},

																	"scores":
																	{
																					"type": "array",
																					"maxItems": 10,
																					"minItems": 10,
																					"items":
																					{
																									"type": "number",
																									"minimum": 1,
																									"maximum": 5
																					}
																	}
													},
													"required": [//"id",
													"name"
													, "photo"
													//, "email"
													, "scores"]
									}
					}
	},
	"required": ["users"]
};
