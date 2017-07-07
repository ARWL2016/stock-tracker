stockTrackerApp.factory('symbolService', function() {
    const companies = [
      {
        "symbol" : "AAL.L",
        "company_name" : "ANGLO AMERICAN"
      },
      {
        "symbol" : "AV.L",
        "company_name" : "AVIVA"
      },
      {
        "symbol" : "AZN.L",
        "company_name" : "ASTRAZENECA"
      },
      {
        "symbol" : "BA.L",
        "company_name" : "BAE SYSTEMS"
      },
      {
        "symbol" : "BARC.L",
        "company_name" : "BARCLAYS"
      },
      {
        "symbol" : "BATS.L",
        "company_name" : "BRIT AMER TOBACCO"
      },
      {
        "symbol" : "BG .L",
        "company_name" : "BG GROUP"
      },
      {
        "symbol" : "BLT.L",
        "company_name" : "BHP BILLITON"
      },
      {
        "symbol" : "BP.L",
        "company_name" : "BP"
      },
      {
        "symbol" : "BRBY.L",
        "company_name" : "BURBERRY GROUP"
      },
      {
        "symbol" : "BSY.L",
        "company_name" : "B SKY B GROUP"
      },
      {
        "symbol" : "CCL.L",
        "company_name" : "CARNIVAL"
      },
      {
        "symbol" : "CNA.L",
        "company_name" : "CENTRICA"
      },
      {
        "symbol" : "CPG.L",
        "company_name" : "COMPASS GROUP"
      },
      {
        "symbol" : "CPI.L",
        "company_name" : "CAPITA"
      },
      {
        "symbol" : "DGE.L",
        "company_name" : "DIAGEO"
      },
      {
        "symbol" : "EMG.L",
        "company_name" : "MAN GROUP"
      },
      {
        "symbol" : "EXPN.L",
        "company_name" : "EXPERIAN"
      },
      {
        "symbol" : "GFS.L",
        "company_name" : "G4S"
      },
      {
        "symbol" : "GLEN.L",
        "company_name" : "GLENCORE INTL"
      },
      {
        "symbol" : "GSK.L",
        "company_name" : "GLAXOSMITHKLINE"
      },
      {
        "symbol" : "HL.L",
        "company_name" : "HARGREAVES LANS"
      },
      {
        "symbol" : "HSBA.L",
        "company_name" : "HSBC HLDG"
      },
      {
        "symbol" : "IAG.L",
        "company_name" : "INTL. CONS. AIR GRP"
      },
      {
        "symbol" : "IHG.L",
        "company_name" : "INTERCONT HOTELS"
      },
      {
        "symbol" : "IMT.L",
        "company_name" : "IMPERIAL TOBACCO"
      },
      {
        "symbol" : "ITRK.L",
        "company_name" : "INTERTEK GROUP"
      },
      {
        "symbol" : "ITV.L",
        "company_name" : "ITV"
      },
      {
        "symbol" : "KAZ.L",
        "company_name" : "KAZAKHMYS"
      },
      {
        "symbol" : "KGF.L",
        "company_name" : "KINGFISHER"
      },
      {
        "symbol" : "LAND.L",
        "company_name" : "LAND SEC R.E.I.T."
      },
      {
        "symbol" : "LGEN.L",
        "company_name" : "LEGAL & GENERAL"
      },
      {
        "symbol" : "LLOY.L",
        "company_name" : "LLOYDS BANKING GRP"
      },
      {
        "symbol" : "MGGT.L",
        "company_name" : "MEGGITT"
      },
      {
        "symbol" : "MKS.L",
        "company_name" : "MARKS & SPENCER"
      },
      {
        "symbol" : "MRW.L",
        "company_name" : "MORRISON SUPERMKTS"
      },
      {
        "symbol" : "NG.L",
        "company_name" : "NATIONAL GRID"
      },
      {
        "symbol" : "NXT.L",
        "company_name" : "NEXT"
      },
      {
        "symbol" : "OML.L",
        "company_name" : "OLD MUTUAL"
      },
      {
        "symbol" : "PFC.L",
        "company_name" : "PETROFAC"
      },
      {
        "symbol" : "PRU.L",
        "company_name" : "PRUDENTIAL"
      },
      {
        "symbol" : "PSON.L",
        "company_name" : "PEARSON"
      },
      {
        "symbol" : "RBS.L",
        "company_name" : "ROYAL BK SCOTL GR"
      },
      {
        "symbol" : "RDSB.L",
        "company_name" : "ROYAL DUTCH SHELL-B"
      },
      {
        "symbol" : "REL.L",
        "company_name" : "REED ELSEVIER PLC"
      },
      {
        "symbol" : "RIO.L",
        "company_name" : "RIO TINTO"
      },
      {
        "symbol" : "RR.L",
        "company_name" : "ROLLS-ROYCE HLDGS"
      },
      {
        "symbol" : "RRS.L",
        "company_name" : "RANDGOLD RESOURCES"
      },
      {
        "symbol" : "RSA.L",
        "company_name" : "RSA INSUR GRP"
      },
      {
        "symbol" : "SAB.L",
        "company_name" : "SABMILLER"
      },
      {
        "symbol" : "SBRY.L",
        "company_name" : "SAINSBURY"
      },
      {
        "symbol" : "SDR.L",
        "company_name" : "SCHRODERS"
      },
      {
        "symbol" : "SDRC.L",
        "company_name" : "SCHRODERS NVTG"
      },
      {
        "symbol" : "SGE.L",
        "company_name" : "SAGE GRP"
      },
      {
        "symbol" : "SL.L",
        "company_name" : "STANDARD LIFE"
      },
      {
        "symbol" : "SMIN.L",
        "company_name" : "SMITHS GROUP"
      },
      {
        "symbol" : "SRP.L",
        "company_name" : "SERCO GROUP"
      },
      {
        "symbol" : "STAN.L",
        "company_name" : "STANDARD CHARTERED"
      },
      {
        "symbol" : "SVT.L",
        "company_name" : "SEVERN TRENT"
      },
      {
        "symbol" : "TATE.L",
        "company_name" : "TATE & LYLE"
      },
      {
        "symbol" : "TSCO.L",
        "company_name" : "TESCO PLC"
      },
      {
        "symbol" : "ULVR.L",
        "company_name" : "UNILEVER"
      },
      {
        "symbol" : "VED.L",
        "company_name" : "VEDANTA RESOURCES"
      },
      {
        "symbol" : "VOD.L",
        "company_name" : "VODAFONE GRP"
      },
      {
        "symbol" : "WPP.L",
        "company_name" : "WPP"
      }
    ]; 

 
    const index = companies.map(company => {
      const orig = company.symbol;
      return {
        symbol: orig.slice(0, orig.length -2),
        company_name: company.company_name
      }
        
      });

    return { index }


  
}); 