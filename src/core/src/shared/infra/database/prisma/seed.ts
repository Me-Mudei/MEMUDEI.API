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
      { key: 'entire_property', name: 'Imóvel inteiro' },
      { key: 'shared_room', name: 'Quarto compartilhado' },
      { key: 'private_room', name: 'Quarto privado' },
    ],
  });

  await prisma.property_type.createMany({
    data: [
      { key: 'apartment', name: 'Apartamento' },
      { key: 'kitnet', name: 'Kitnet' },
      { key: 'republic', name: 'República' },
      { key: 'house', name: 'Casa' },
      { key: 'pension', name: 'Pensionato' },
    ],
  });

  await prisma.property_relationship.createMany({
    data: [
      { key: 'owner', name: 'Propietário' },
      { key: 'adm', name: 'Administrador/Terceiro' },
      { key: 'broker', name: 'Corretor' },
    ],
  });

  await prisma.rule.createMany({
    data: [
      { key: 'pets', name: 'Proibido animais de estimação' },
      { key: 'smoking', name: 'Proibido fumar' },
      { key: 'party', name: 'Proibido festas' },
      { key: 'guest', name: 'Proibido hóspedes' },
      { key: 'visitors', name: 'Proibido visitantes' },
      { key: 'children', name: 'Proibido crianças' },
      { key: 'alcohol', name: 'Proibido bebidas alcoólicas' },
      { key: 'drugs', name: 'Proibido drogas' },
      { key: 'noise', name: 'Proibido barulho' },
    ],
  });

  await prisma.property_detail.createMany({
    data: [
      { key: 'sofa', name: 'Sofá' },
      { key: 'table', name: 'Mesa' },
      { key: 'cupboards', name: 'Armario de cozinha' },
      { key: 'stove', name: 'Fogão' },
      { key: 'microwave', name: 'Microondas' },
      { key: 'washing_machine', name: 'Maquina de lavar' },
      { key: 'refrigerator', name: 'Geladeira' },
      { key: 'wardrobe', name: 'Armarios no quarto' },
      { key: 'bed', name: 'Cama' },
      { key: 'bathroom_boxes', name: 'Box' },
      { key: 'wifi', name: 'WiFi' },
      { key: 'gas', name: 'Gás encanado' },
      { key: 'air_conditioning', name: 'Ar condicionado' },
      { key: 'private_pool', name: 'Piscina privativa' },
      { key: 'closet', name: 'Closet' },
      { key: 'open_kitchen', name: 'Cozinha americana' },
      { key: 'services_area', name: 'Área de serviços' },
      { key: 'garden', name: 'Jardin' },
      { key: 'yard', name: 'Quintal' },
      { key: 'balcony', name: 'Varanda' },
    ],
  });

  await prisma.condominium_detail.createMany({
    data: [
      { key: 'elevator', name: 'Elevador' },
      { key: 'reception', name: 'Portaria 24h' },
      { key: 'tactile_floor', name: 'Piso tátil' },
      { key: 'ramps', name: 'Rampas de acesso' },
      { key: 'handrail', name: 'Corrimão' },
      { key: 'pool', name: 'Piscina' },
      { key: 'playground', name: 'Playground' },
      { key: 'barbecue_area', name: 'Churrasqueira' },
      { key: 'gym', name: 'Academia' },
      { key: 'party_room', name: 'Salão de festas' },
      { key: 'sauna', name: 'Sauna' },
      { key: 'laundry', name: 'Lavanderia no prédio' },
      { key: 'green_areas', name: 'Área verde' },
      { key: 'games_room', name: 'Salão de jogos' },
    ],
  });

  await prisma.floor_plan.createMany({
    data: [
      { key: 'footage', unit: 'm²', name: 'Metragem' },
      { key: 'bedrooms', unit: 'quartos', name: 'Quartos' },
      { key: 'suites', unit: 'suites', name: 'Suítes' },
      { key: 'bathrooms', unit: 'banheiros', name: 'Banheiros' },
      { key: 'garage', unit: 'vagas', name: 'Vagas de garagem' },
    ],
  });

  await prisma.charge.createMany({
    data: [
      { key: 'rent', name: 'Aluguel' },
      { key: 'condominium', name: 'Condomínio' },
      { key: 'iptu', name: 'IPTU' },
      { key: 'water', name: 'Água' },
      { key: 'electricity', name: 'Luz' },
      { key: 'gas', name: 'Gás' },
      { key: 'internet', name: 'Internet' },
      { key: 'cable_tv', name: 'TV a cabo' },
      { key: 'garbage_collection', name: 'Coleta de lixo' },
      { key: 'cleaning', name: 'Limpeza' },
      { key: 'security', name: 'Segurança' },
      { key: 'parking', name: 'Estacionamento' },
      { key: 'other', name: 'Outros' },
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
