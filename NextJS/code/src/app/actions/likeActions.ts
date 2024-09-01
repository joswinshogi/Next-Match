'use server';
import { prisma } from '@/lib/prisma';
import { getAuthUserId } from './authActions';

export async function toggleLikeMember(targetUserId: string,isLiked: boolean){
    try {
        const userId = await getAuthUserId()

        if(isLiked){
            await prisma.like.delete({
                where:{
                    sourceUserId_targetUserId:{
                        sourceUserId:userId,
                        targetUserId
                    }
                }
            })
        } else {
            await prisma.like.create({
                data:{
                    sourceUserId: userId,
                    targetUserId
                }
            })
    }
    } catch (error) {
        console.log(error)
        throw error;
    }
  
}
export async function fetchCurrentUserLikeIds(){
    try {
        const userId = await getAuthUserId();

        const likeIds = await prisma.like.findMany({
            where:{
                sourceUserId: userId
            },
            select:{
                targetUserId: true
            }
        
        })
        return likeIds.map(like=>like.targetUserId)
    } catch (error) {
        console.log(error)
        throw error;
    }
    
}

export async function fetchLikeMembers(type='source'){
    try {
        const userId = await getAuthUserId();

        switch (type) {
            case 'source':
                return await getSourceLikes(userId)
            case 'target':
                return await getTargetLikes(userId)
            case 'mutual': 
                return await getMutualLikes(userId)
            default:
                return []
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getSourceLikes(userId: string) {
    const sourceList = await prisma.like.findMany({
        where:{
            sourceUserId: userId
        },
        select:{
            targetMember: true
        }
    })
    return sourceList.map(x => x.targetMember)
}

async function getTargetLikes(userId: string) {
    const targetList = await prisma.like.findMany({
        where:{
            targetUserId: userId
        },
        select:{
            sourceMember: true
        }
    })
    return targetList.map(x => x.sourceMember)
}

async function getMutualLikes(userId: string) {
    const likedMembers = await prisma.like.findMany({
        where:{
            sourceUserId: userId
        },
        select:{
            targetUserId: true
        }
    })
    const likeIds = likedMembers.map(x => x.targetUserId)
    const mutualList = await prisma.like.findMany({
        where:{
            AND:[
                {targetUserId: userId},
                {sourceUserId: {in: likeIds}}
            ]
        },
        select:{
            sourceMember: true
        }
    })
    return mutualList.map(x => x.sourceMember)
}

