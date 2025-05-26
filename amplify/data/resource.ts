import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { getWeather } from '../functions/weather/resource';
import { generateImage } from '../functions/generateImage/resource';

const schema = a.schema({
  getWeather: a.query()
  .arguments({city: a.string().required()})
  .returns(a.customType({
    value: a.float().required(),
    unit: a.string().required(),
  }))
  .handler(a.handler.function(getWeather))
  .authorization((allow) => allow.authenticated()),

  chat: a.conversation({
    aiModel: a.ai.model('Claude 3 Haiku'),
    systemPrompt: `You are a helpful assistant. When asked about the weather, use the getWeatherTool and respond using the WeatherCard component with the following props: city, temperature, unit.`,
    tools:[{
      name: 'getWeatherTool',
      description: 'Provide the current weather for the city',
      query: a.ref('getWeather')
    }],
  }).authorization(
    allow => allow.owner()
    ),

    generateRecipe: a.generation({
      aiModel: a.ai.model('Claude 3 Haiku'),
      systemPrompt: 'You are a helpful assistant that generates recipes.',
    })
    .arguments({
      description: a.string(),
    })
    .returns(
      a.customType({
        name: a.string(),
        ingredients: a.string().array(),
        instructions: a.string(),
      })
    ).authorization((allow) => allow.authenticated()),


    generateImage: a
    .query()
    .arguments({
      prompt: a.string(),
    })
    .returns(a.string().array())
    .handler(a.handler.function(generateImage))
    .authorization((allow) => [allow.authenticated()]), 
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});

