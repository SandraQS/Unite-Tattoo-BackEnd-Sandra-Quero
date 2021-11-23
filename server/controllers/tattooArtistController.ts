import TattooArtistModel from "../../database/models/tattooArtist";

const tattooArtistRegister = async (req, res) => {
  const {
    personalDataTattoArtist,
    userDataTattoArtist,
    professionalDataTattooArtist,
    collections,
    appointmentSchedule,
  } = req.body;

  const newTattooArtist = await TattooArtistModel.create({
    personalDataTattoArtist,
    userDataTattoArtist,
    professionalDataTattooArtist,
    collections,
    appointmentSchedule,
  });
  res.json(newTattooArtist);
};

export default tattooArtistRegister;
