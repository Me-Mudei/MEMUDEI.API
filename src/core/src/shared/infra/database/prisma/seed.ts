import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.role.createMany({
    data: [
      {
        name: 'ADMIN',
        description: 'Admin manager',
      },
      {
        name: 'TESTER',
        description: 'Tester manager',
      },
    ],
    skipDuplicates: true,
  });

  await prisma.permission.createMany({
    data: [
      {
        name: 'FIND_USER_BY_ID',
        description: 'Find user by id',
      },
      {
        name: 'SEARCH_USER',
        description: 'Search user',
      },
      {
        name: 'CREATE_USER',
        description: 'Create user',
      },
      {
        name: 'UPDATE_USER',
        description: 'Update user',
      },
      {
        name: 'DELETE_USER',
        description: 'Delete user',
      },
    ],
  });

  await prisma.user.create({
    data: {
      name: 'Uriel Guy',
      email: 'uriel.guy@memudei.me',
      role: {
        connect: {
          name: 'ADMIN',
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      id: 'MgxO159FtDCCYQYULEhBy',
      name: 'Jhon Doe',
      email: 'jhon.doe@memudei.me',
      role: {
        connect: {
          name: 'TESTER',
        },
      },
    },
  });

  await prisma.privacy_type.createMany({
    data: [
      { name: 'entire_property', description: 'Imóvel inteiro' },
      { name: 'shared_room', description: 'Quarto compartilhado' },
      { name: 'private_room', description: 'Quarto privado' },
    ],
  });

  await prisma.property_type.createMany({
    data: [
      { name: 'apartment', description: 'Apartamento' },
      { name: 'kitnet', description: 'Kitnet' },
      { name: 'republic', description: 'República' },
      { name: 'house', description: 'Casa' },
      { name: 'pension', description: 'Pensionato' },
    ],
  });

  await prisma.property_relationship.createMany({
    data: [
      { name: 'owner', description: 'Propietário' },
      { name: 'adm', description: 'Administrador/Terceiro' },
      { name: 'broker', description: 'Corretor' },
    ],
  });

  await prisma.rule.createMany({
    data: [
      { name: 'pets', description: 'Proibido animais de estimação' },
      { name: 'smoking', description: 'Proibido fumar' },
      { name: 'party', description: 'Proibido festas' },
      { name: 'guest', description: 'Proibido hóspedes' },
      { name: 'visitors', description: 'Proibido visitantes' },
      { name: 'children', description: 'Proibido crianças' },
      { name: 'alcohol', description: 'Proibido bebidas alcoólicas' },
      { name: 'drugs', description: 'Proibido drogas' },
      { name: 'noise', description: 'Proibido barulho' },
    ],
  });

  await prisma.property_detail.createMany({
    data: [
      { name: 'sofa', description: 'Sofá' },
      { name: 'mesa', description: 'Mesa' },
      { name: 'armario_de_cozinha', description: 'Armario de cozinha' },
      { name: 'fogão', description: 'Fogão' },
      { name: 'microondas', description: 'Microondas' },
      { name: 'maquina_de_lavar', description: 'Maquina de lavar' },
      { name: 'geladeira', description: 'Geladeira' },
      { name: 'armarios_no_quarto', description: 'Armarios no quarto' },
      { name: 'cama', description: 'Cama' },
      { name: 'box', description: 'Box' },
      { name: 'wifi', description: 'WiFi' },
      { name: 'gas', description: 'Gás encanado' },
      { name: 'ar_condicionado', description: 'Ar condicionado' },
      { name: 'piscina_privativa', description: 'Piscina privativa' },
      { name: 'closet', description: 'Closet' },
      { name: 'cozinha_americana', description: 'Cozinha americana' },
      { name: 'area_de_servicos', description: 'Área de serviços' },
      { name: 'jardin', description: 'Jardin' },
      { name: 'quintal', description: 'Quintal' },
      { name: 'varanda', description: 'Varanda' },
    ],
  });

  await prisma.condominium_detail.createMany({
    data: [
      { name: 'elevador', description: 'Elevador' },
      { name: 'portaria', description: 'Portaria 24h' },
      { name: 'piso-tatil', description: 'Piso tátil' },
      { name: 'rampas', description: 'Rampas de acesso' },
      { name: 'corrimao', description: 'Corrimão' },
      { name: 'piscina', description: 'Piscina' },
      { name: 'playground', description: 'Playground' },
      { name: 'churrasqueira', description: 'Churrasqueira' },
      { name: 'academia', description: 'Academia' },
      { name: 'salao-festas', description: 'Salão de festas' },
      { name: 'sauna', description: 'Sauna' },
      { name: 'lavanderia', description: 'Lavanderia no prédio' },
      { name: 'salao-festas', description: 'Salão de jogos' },
      { name: 'area-verde', description: 'Área verde' },
    ],
  });

  await prisma.floor_plan.createMany({
    data: [
      { name: 'footage', unit: 'm²' },
      { name: 'bedrooms', unit: 'quartos' },
      { name: 'suites', unit: 'suites' },
      { name: 'bathrooms', unit: 'banheiros' },
      { name: 'garage', unit: 'vagas' },
    ],
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
