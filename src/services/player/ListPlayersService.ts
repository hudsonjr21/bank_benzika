import prismaClient from "../../prisma";

class ListPlayerService {
  async execute() {
    const players = await prismaClient.player.findMany({
      select: {
        id: true,
        name: true,
        profile: true,
        position_id: true,
        birthday: true,
        team_id: true,
      },
    });

    const playersWithProfileImages = players.map((player) => ({
      ...player,
      profileImage: `http://localhost:3333/tmp/${player.profile}`, // Use a URL correta do backend
    }));

    return playersWithProfileImages;
  }
}

export { ListPlayerService };