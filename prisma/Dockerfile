FROM public.ecr.aws/lambda/nodejs:14

COPY ./prisma  ${LAMBDA_TASK_ROOT}/prisma
COPY ./prisma/aws-lambda/index.js  ${LAMBDA_TASK_ROOT}

RUN npm install -g prisma@4.2.1

CMD ['index.handler']