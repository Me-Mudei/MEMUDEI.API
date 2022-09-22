FROM public.ecr.aws/lambda/nodejs:16

COPY .  ${LAMBDA_TASK_ROOT}/prisma
COPY ./lambda/index.js  ${LAMBDA_TASK_ROOT}

RUN npm install -g prisma@4.3.1

CMD ["index.handler"]