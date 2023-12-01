import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export class RequestController {

    // listar as solicitações
    async index(req: Request, res: Response) {
        try {
            const solicitacoes = await prisma.request.findMany({
                where: { deleted_at : null },
                select: {
                    id: true,
                    hospital: true,
                    medication: true,
                    priority: true,
                    status: true,
                    quantity: true,
                    description: true,
                    due_date: true,
                    return_date: true,
                    created_at: true,
                    updated_at: true,
                },
            });

            return res.status(200).json({
                message: 'Requests found sucessfully.',
                data: solicitacoes,
            });
        } catch (exception) {
            return res.status(500).json({ error: exception });
        }
    }

    // lista as solicitações por search:valor
    async search(req: Request, res: Response) {
        try {
            const { search } = req.query;
    
            let valor = { deleted_at: null };
    
            if (search) {
                valor = {
                    ...valor,
                    OR: [
                        { hospital: { contains: search, caseSensitive: false } },
                        { medication: { contains: search, caseSensitive: false } },
                        { priority: { contains: search, caseSensitive: false } },
                        { status: { contains: search, caseSensitive: false } },
                        { quantity: { contains: search, caseSensitive: false } },
                        { description: { contains: search, caseSensitive: false } },
                        { due_date: { contains: search, caseSensitive: false } },
                        { return_date: { contains: search, caseSensitive: false } },
                        { created_at: { contains: search, caseSensitive: false } },
                        { updated_at: { contains: search, caseSensitive: false } },
                    ],
                };
            }
    
            const solicitacoes = await prisma.request.findMany({
                where: valor,
                select: {
                    id: true,
                    hospital: true,
                    medication: true,
                    priority: true,
                    status: true,
                    quantity: true,
                    description: true,
                    due_date: true,
                    return_date: true,
                    created_at: true,
                    updated_at: true,
                },
            });
    
            if (solicitacoes.length === 0) {
                return res.status(404).json({
                    error: 'Request not found',
                    message: 'Nenhuma solicitação encontrada com base na pesquisa fornecida.',
                });
            }
    
            return res.status(200).json({
                message: 'Requests found sucessfully.',
                data: solicitacoes,
            });
        } catch (exception) {
            return res.status(500).json({ error: exception });
        }
    }

    // criar solicitação
    async create(req: Request, res: Response) {
        try {
            const {
                hospital_id,
                medication_id,
                priority_id,
                status_id,
                quantity,
                description,
                due_date,
                return_date,
            } = req.body;

            if(
                !hospital_id || !medication_id || !priority_id || !status_id || !quantity || quantity <= 0 || !description || !due_date || !return_date
            ) {
                return res.status(404).json({
                    error: 'Missing or invalid data.',
                    message: 'Please provide all required fields.',
                });
            }


            const foundHospital = await prisma.user.findUnique({
                where: { id: hospital_id, deleted_at: null},
            });

            if (!foundHospital) {
                return res.status(404).json({
                  error: "Hospital not found",
                  message: "A hospital with the provided ID not exists.",
                });
              }

            const foundMed = await prisma.user.findUnique({
                where: { id: medication_id, deleted_at: null},
            });

            if(!foundMed) {
                return res.status(404).json({
                    error: 'Medication not found',
                    message: 'A medication with the provided ID not exists.',
                });
            }

            const foundPriority = await prisma.user.findUnique({
                where: { id: priority_id, deleted_at: null},
            });

            if(!foundPriority){
                return res.status(404).json({
                    error: 'Priority not found',
                    message: 'A priority with the provided ID not exists.'
                });
            }

            const foundStatus = await prisma.user.findUnique({
                where: { id: status_id, deleted_at: null},
            });

            if(!foundStatus){
                return res.status(404).json({
                    error: 'Status not found',
                    message: 'A status with the provided ID not exists.',
                });
            }

            const solicitacaoCriada = await prisma.request.create({
                data : {
                    hospital_id,
                    medication_id,
                    priority_id,
                    status_id,
                    quantity,
                    description,
                    due_date: new Date(due_date),
                    return_date: new Date(return_date),
                    },

                select: {
                    id: true,
                    hospital: true,
                    medication: true,
                    priority: true,
                    status: true,
                    quantity: true,
                    description: true,
                    due_date: true,
                    return_date: true,
                    created_at: true,
                    updated_at: true,
                    },
                });

                return res.status(201).json({
                    message: 'Request created sucessfully.',
                    data: solicitacaoCriada,
                })
        } catch (exception) {
            return res.status(500).json({ error: exception });
        }
    }


    // exibir detalhes da solicitação 
    async view(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const solicitacao = await prisma.request.findUnique({
                where: { id, deleted_at: null},
                select: {
                    id: true,
                    hospital: true,
                    medication: true,
                    priority: true,
                    status: true,
                    quantity: true,
                    description: true,
                    due_date: true,
                    return_date: true,
                    created_at: true,
                    updated_at: true,
                },
            });

            if(!solicitacao){
                return res.status(404).json({
                    error: 'Request not found',
                    message: 'A solicitação com o ID fornecido não existe',
                });
            }

            return res.status(200).json({
                message: 'Request found sucessfully.',
                data: solicitacao,
            });
        } catch (exception) {
            return res.status(500).json({ error: exception });
        }
    }

    // atualiza totalmente a solicitação
    async fullUpdate(req: Request, res: Response) {
        try {
        const { id } = req.params;
        const {
            hospital_id,
            medication_id,
            priority_id,
            status_id,
            quantity,
            description,
            due_date,
            return_date, } = req.body;

        if (
            !hospital_id ||
            !medication_id ||
            !priority_id ||
            !status_id ||
            !quantity ||
            quantity <= 0 ||
            !description ||
            !due_date ||
            !return_date
        ) {
        return res.status(400).json({
          error: "Missing or invalid data",
          message: "Please provide all required fields to update.",
        });
      }

      const foundRequest = await prisma.request.findUnique({
        where: { id, deleted_at: null },
      });

      if (!foundRequest) {
        return res.status(404).json({
          error: "Request not found",
          message: "A request with the provided ID does not exist.",
        });
      }

      const foundHospital = await prisma.user.findUnique({
        where: { id: hospital_id, deleted_at: null },
      });

      if (!foundHospital) {
        return res.status(404).json({
          error: "Hospital not found",
          message: "A hospital with the provided ID not exists.",
        });
      }

      const foundMedication = await prisma.medication.findUnique({
        where: { id: medication_id, deleted_at: null },
      });

      if (!foundMedication) {
        return res.status(404).json({
          error: "Medication not found",
          message: "A medication with the provided ID not exists.",
        });
      }

      const foundPriority = await prisma.priority.findUnique({
        where: { id: priority_id, deleted_at: null },
      });

      if (!foundPriority) {
        return res.status(404).json({
          error: "Priority not found",
          message: "A priority with the provided ID not exists.",
        });
      }

      const foundStatus = await prisma.status.findUnique({
        where: { id: status_id, deleted_at: null },
      });

      if (!foundStatus) {
        return res.status(404).json({
          error: "Status not found",
          message: "A status with the provided ID not exists.",
        });
      }

      const solicitacaoAtualizada = await prisma.request.update({
        where: { id },
        data: {
            hospital_id,
            medication_id,
            priority_id,
            status_id,
            quantity,
            description,
            due_date: new Date(due_date),
            return_date: new Date(return_date),
        },
        select: {
            id: true,
            hospital: true,
            medication: true,
            priority: true,
            status: true,
            quantity: true,
            description: true,
            due_date: true,
            return_date: true,
            created_at: true,
            updated_at: true,
        },
      });

        return res.status(200).json({
            message: 'Request updated sucessfully.',
            data: solicitacaoAtualizada,
        });

        } catch (exception) {
            return res.status(500).json({ error: exception });
        }
    }

    // atualiza parcialmente a solicitação
    async partialUpdate(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const {
                hospital_id,
                medication_id,
                priority_id,
                status_id,
                quantity,
                description,
                due_date,
                return_date, } = req.body;
    
            if (
                !hospital_id ||
                !medication_id ||
                !priority_id ||
                !status_id ||
                !quantity ||
                quantity <= 0 ||
                !description ||
                !due_date ||
                !return_date
            ) {
            return res.status(400).json({
              error: "Missing or invalid data",
              message: "Please provide all required fields to update.",
            });
          }

          if (
            hospital_id === null ||
            medication_id === null ||
            priority_id === null ||
            status_id === null ||
            quantity === null ||
            description === null ||
            due_date === null ||
            return_date === null
          ) {
            return res.status(400).json({
              error: "Incomplete information",
              message: "None of these fields can be null.",
            });
          }

          const foundRequest = await prisma.request.findUnique({
            where: { id, deleted_at: null },
          });
    
          if (!foundRequest) {
            return res.status(404).json({
              error: "Request not found",
              message: "A request with the provided ID does not exist.",
            });
          }
    
          const foundHospital = await prisma.user.findUnique({
            where: { id: hospital_id, deleted_at: null },
          });
    
          if (!foundHospital) {
            return res.status(404).json({
              error: "Hospital not found",
              message: "A hospital with the provided ID not exists.",
            });
          }
    
          const foundMedication = await prisma.medication.findUnique({
            where: { id: medication_id, deleted_at: null },
          });
    
          if (!foundMedication) {
            return res.status(404).json({
              error: "Medication not found",
              message: "A medication with the provided ID not exists.",
            });
          }
    
          const foundPriority = await prisma.priority.findUnique({
            where: { id: priority_id, deleted_at: null },
          });
    
          if (!foundPriority) {
            return res.status(404).json({
              error: "Priority not found",
              message: "A priority with the provided ID not exists.",
            });
          }
    
          const foundStatus = await prisma.status.findUnique({
            where: { id: status_id, deleted_at: null },
          });
    
          if (!foundStatus) {
            return res.status(404).json({
              error: "Status not found",
              message: "A status with the provided ID not exists.",
            });
          }

          const solicitacaoAtualizada = await prisma.request.update({
            where: { id },
            data: {
                hospital_id,
                medication_id,
                priority_id,
                status_id,
                quantity,
                description,
                due_date: new Date(due_date),
                return_date: new Date(return_date),
            },

            select: {
                id: true,
                hospital: true,
                medication: true,
                priority: true,
                status: true,
                quantity: true,
                description: true,
                due_date: true,
                return_date: true,
                created_at: true,
                updated_at: true,
            },
          });

          return res.status(200).json({
            message: 'Request updated sucessfully.',
            data: solicitacaoAtualizada,
          });
        } catch (exception) {
            return res.status(500).json({ error: exception });
        }
    }
    
    // exclui a solicitação
    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const solicitacao = await prisma.request.findUnique({
                where: { id, deleted_at: null},
            });

            if(!solicitacao){
                return res.status(404).json({
                    error: 'Request not found',
                    message: 'Please provide the ID of an existing request.',
                });
            }

            await prisma.request.update({
                where: { id },
                data: { deleted_at: new Date() },
            });


            return res.status(204).json({
                message: 'Request deleted sucessfully.',
            });

        } catch (exception) {
            return res.status(500).json({ error: exception });
        }
    }

}