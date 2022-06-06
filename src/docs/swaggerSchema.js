export default {
  openapi: '3.0.0',
  info: {
    title: 'checkout',
    description: '',
    version: '1',
  },
  paths: {
    '/CheckoutService/checkout': {
      post: {
        operationId: 'CheckoutService.checkout',
        description: '',
        parameters: {
          name: 'body',
          in: 'body',
          required: true,
          description: '',
          schema: {
            $ref: '#/components/schemas/orderId',
          },
        },
        responses: {
          200: {
            description: '',
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/Status',
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      orderId: {
        type: 'object',
        properties: {
          orderId: {
            type: 'string',
          },
        },
      },
      Status: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
          },
        },
      },
    },
  },
};
